import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, Typography, Avatar, Grid, TextField, Button, Box, CircularProgress, Skeleton, Stack, Snackbar, Alert } from '@mui/material';
import { useMutateComment } from '@/hooks/comment/useMutateComment';
import { useCommentsByBlogId } from '@/hooks/comment/useCommentsByBlogId';
import { CreateCommentPayload } from '@/interfaces/comment';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface PropsComment {
  blogId: number;
}

const CommentList = ({ blogId }: PropsComment) => {
  const { control, handleSubmit, reset } = useForm<CreateCommentPayload>();
  const [isFocused, setIsFocused] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { mutate, isPending } = useMutateComment();
  const { data: comments, isLoading, error } = useCommentsByBlogId(blogId);

  const { id: userId, isLogged } = useAuth();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = (data: Omit<CreateCommentPayload, 'blogId' | 'userId'>) => {
    if (!isLogged) {
      setOpenSnackbar(true);
      setIsFocused(false);
      return;
    }

    const payload: CreateCommentPayload = {
      ...data,
      blogId,
      userId
    };

    mutate(payload, {
      onSuccess: () => {
        reset();
        setIsFocused(false);
      },
    });
  };

  if (error) return <Typography color="error">Erro ao carregar comentários</Typography>;

  return (
    <Box sx={{ mt: "4rem" }}>
      <Box mb={2}>
        <Typography variant="h5" gutterBottom>
          Comentários
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={isFocused ? 4 : 1}
                variant="outlined"
                placeholder="Escreva seu comentário..."
                onFocus={() => setIsFocused(true)}
              />
            )}
          />
          {isFocused && (
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isPending}
                sx={{ mt: 1 }}
                startIcon={isPending && <CircularProgress size={16} sx={{ color: 'grey.500' }} />}
              >
                Comentar
              </Button>
            </Box>
          )}
        </form>
      </Box>
      {
        isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={60} />
        ) : (
        <Stack spacing={1}>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Grid item xs={12} key={comment.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar>{comment.username.charAt(0)}</Avatar>
                      </Grid>
                      <Grid item xs>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="body1">
                            <Link href={`/user/${comment.idUser}`}>
                              <strong className="underline">{comment.name}</strong>
                            </Link>
                              <Typography variant="body2" color="textSecondary" component="span" sx={{ ml: 1 }}>
                                @{comment.username}
                              </Typography>
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(comment.createdAt).toLocaleDateString('pt-BR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </Typography>
                        </Box>
                        <Typography variant="body1">{comment.content}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box>
              <Typography color="grey">Sem comentários</Typography>
            </Box>
          )}
        </Stack>
        )
      }
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="warning"
          sx={{ width: '100%' }}
        >
          Você precisa estar logado para comentar!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentList;
