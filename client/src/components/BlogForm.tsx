"use client";

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Stack, Box, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { useTags } from '@/hooks/tag/useTags';
import { useSlugUnique } from '@/hooks/blog/useSlugUnique';
import { CreateBlogPostPayload } from '@/interfaces/blog';
import { useMutateBlogPost } from '@/hooks/blog/useMutateBlog';
import { useAuth } from '@/contexts/AuthContext';

interface FormValues {
  title: string;
  description: string;
  content: string;
  coverImage: File | undefined;
  tagId: number;
}

const BlogForm = () => {
  const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      tagId: 1,
      coverImage: undefined,
    },
  });
  const coverImage = watch('coverImage');
  const [slug, setSlug] = useState("");
  const [slugError, setSlugError] = useState<string | null>(null);
  const { id: authorId } = useAuth()

  const { data: tags, isLoading: isTagsLoading } = useTags();
  const { mutate: createBlogPost, isPending: isCreating, error: createError } = useMutateBlogPost();
  
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue('coverImage', acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
  });

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const { data: isSlugUnique, isLoading: isSlugChecking } = useSlugUnique(slug);
  
  const onSubmit = async (data: FormValues) => {

    if(!isSlugUnique?.isUnique){
      setSlugError("Altera o título. Slug em uso.")
      return;
    }

    const formDataWithSlug: CreateBlogPostPayload = {
      title: data.title,
      cover: data.coverImage, // Agora é o arquivo de imagem
      content: data.content,
      description: data.description,
      slug,
      tagId: data.tagId,
      authorId,
    };

    createBlogPost(formDataWithSlug, {
      onSuccess: () => {
        setSlugError(null);
        reset();
      }
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Box
            {...getRootProps()}
            sx={{
              border: '1px dashed #949494',
              borderRadius: 1,
              padding: 2,
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: isDragActive ? '#e0f7fa' : '',
              color: isDragReject ? '#f44336' : '#000',
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="body1">Solte</Typography>
            ) : coverImage ? (
              <Typography variant="body1">{coverImage.name}</Typography>
            ) : (
              <Upload size={30} strokeWidth={1} />
            )}
          </Box>

          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: "2rem" }, 
              "& > div": { flex: 1, width: "100%" }
              }}
          >
            <Stack spacing={2}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: 'O título é obrigatório.' }}
                render={({ field }) => (
                  <TextField
                    label="Título"
                    variant="outlined"
                    {...field}
                    fullWidth
                    onChange={(e) => {
                      field.onChange(e);
                      const generatedSlug = generateSlug(e.target.value);
                      setSlug(generatedSlug);
                    }}
                    error={!!errors.title || !!slugError}
                    helperText={errors.title?.message || slugError}
                  />
                )}
              />

              <Controller
                name="tagId"
                control={control}
                rules={{ required: 'A tag é obrigatória.' }}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined" error={!!errors.tagId}>
                    <InputLabel>Tag</InputLabel>
                    <Select
                      {...field}
                      label="Tag"
                      disabled={isTagsLoading}
                      fullWidth
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      {isTagsLoading ? (
                        <MenuItem value={1}>
                          <CircularProgress size={24} />
                        </MenuItem>
                      ) : (
                        tags?.map((tag) => (
                          <MenuItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                    {errors.tagId && (
                      <Typography variant="body2" color="error">
                        {errors.tagId.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Stack>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: 'A descrição é obrigatória.' }}
              render={({ field }) => (
                <TextField
                  label="Descrição"
                  variant="outlined"
                  rows={4}
                  multiline
                  {...field}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Box>

          <div style={{ marginBottom: "-3.5rem" }} />

          <Controller
            name="content"
            control={control}
            defaultValue=""
            rules={{
              required: 'O conteúdo é obrigatório.',
              validate: (value) =>
                value.length > 200 || 'O conteúdo deve ter mais de 200 caracteres.',
            }}
            render={({ field }) => (
              <>
                <MarkdownEditor
                  {...field}
                  style={{ height: "500px", marginTop: "58px", maxHeight: "calc(100vh - 58px)" }}
                  renderHTML={(text) => new MarkdownIt().render(text)}
                  onChange={({ text }) => field.onChange(text)}
                />
                {errors.content && (
                  <Typography variant="body2" color="error">
                    {errors.content.message}
                  </Typography>
                )}
              </>
            )}
          />

          {createError && (
            <Typography variant="body2" color="error">
              {createError.message}
            </Typography>
          )}

          <Button type="submit" variant="contained" disabled={isSlugChecking || isCreating}>
            {(isSlugChecking || isCreating) ? 'Criando...' : 'Criar Blog'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BlogForm;
