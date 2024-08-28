"use client"

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Stack, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FormValues {
  title: string;
  description: string;
  content: string;
  coverImage: File | null;
}

const BlogForm = () => {
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>();
  const coverImage = watch('coverImage');

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setValue('coverImage', acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    multiple: false,   // Permitir apenas um arquivo por vez
  });

  const onSubmit = (data: FormValues) => {
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log(data);
  };

  return (
    <Box sx={{ maxWidth: 600, padding: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #ccc',
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
              <Upload size={30} />
            )}
          </Box>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Título"
                variant="outlined"
                {...field}
                fullWidth
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Descrição"
                variant="outlined"
                {...field}
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Conteúdo"
                variant="outlined"
                {...field}
                fullWidth
                multiline
                rows={8}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Criar Blog
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BlogForm;
