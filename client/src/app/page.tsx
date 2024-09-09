"use client";

import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid, Container, CircularProgress, Alert } from '@mui/material';
import Link from 'next/link';
import { useBlogs } from '@/hooks/blog/useBlog';
import { LoadingBlog } from '@/components/LoadingBlog';

const Home = () => {
  const { data: blogsResponse, isLoading: isLoadingBlogs, isError: isErrorBlogs } = useBlogs(1, 3);

  const { data: articlesResponse, isLoading: isLoadingArticles, isError: isErrorArticles } = useBlogs(1, 3, 1);

  if (isErrorBlogs || isErrorArticles) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Alert severity="error">Ocorreu um erro ao carregar os blogs ou artigos.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box mb={12}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', } }}
        >
          Bem-vindo ao meu blog! Eu sou o Diego e aqui documentarei minhas últimas explorações.
        </Typography>
        <Box mt={4}>
          <Link href="https://diegocardoso.vercel.app/" target='_blank' passHref>
            <Button variant="outlined" sx={{ mr: 2 }}>Sobre mim</Button>
          </Link>
          <Link href="/galeria" passHref>
            <Button variant="outlined">Galeria</Button>
          </Link>
        </Box>
      </Box>
      
      <Typography variant="h4" component="h2" gutterBottom mb={4}>
        Blogs Recentes
      </Typography>
      {
        isLoadingBlogs ? (
          <LoadingBlog numberBlogs={3}/>
        ) : (
          <Grid container spacing={4} mb={12}>
            {blogsResponse?.data.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.slug}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.cover || 'https://via.placeholder.com/300x140?text=No+Image'}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 3,
                        textOverflow: 'ellipsis',
                        height: '60px',
                        flex: 1
                      }}
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                  <Box p={2}>
                    <Button variant="outlined" component={Link} href={`/${post.slug}`}>Leia mais</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      }
      
      <Typography variant="h4" component="h2" gutterBottom mb={4}>
        Artigos Recentes
      </Typography>
      {
        isLoadingArticles ? (
          <LoadingBlog numberBlogs={3}/>
        ) : (
          <Grid container spacing={4}>
            {articlesResponse?.data.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.slug}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={post.cover || 'https://via.placeholder.com/300x140?text=No+Image'}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 3,
                        textOverflow: 'ellipsis',
                        height: '60px',
                        flex: 1
                      }}
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                  <Box p={2}>
                    <Button variant="outlined" component={Link} href={`/${post.slug}`}>Leia mais</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )
      }
    </Container>
  );
};

export default Home;
