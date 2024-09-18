"use client"

import { useUserById } from '@/hooks/user/useUserById';
import { CircularProgress, Container, Typography, Grid, Box, Stack, Card, CardContent, Avatar, Link } from '@mui/material';

interface Props {
  params: { userId: string };
}

const UserPage = ({ params }: Props) => {
  const { userId } = params;

  const { data: user, isLoading, error } = useUserById(Number(userId));

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erro ao carregar os dados do usuário</Typography>;
  }

  return (
    <Container maxWidth="md">
      {/* Informações do usuário */}
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">{user?.name}</Typography>
            <Typography variant="subtitle1">@{user?.username}</Typography>
            <Typography variant="subtitle1">Email: {user?.login}</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Comentários do usuário */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Comentários Postados
        </Typography>
        <Stack spacing={2}>
          {user?.comments && user.comments.length > 0 ? (
            user.comments.map((comment) => (
              <Grid item xs={12} key={comment.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar>{user.username.charAt(0)}</Avatar>
                      </Grid>
                      <Grid item xs>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="body1">
                            <strong className="underline">{user.name}</strong>
                            <Typography variant="body2" color="textSecondary" component="span" sx={{ ml: 1 }}>
                              @{user.username}
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
      </Box>
    </Container>
  );
};

export default UserPage;
