"use client";

import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid, Container } from '@mui/material';
import Link from 'next/link';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box mb={14}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bem-vindo ao meu blog! Eu sou o Diego e aqui documentarei minhas últimas explorações.
        </Typography>
        <Box mt={4}>
          <Button variant="outlined" sx={{ mr: 2 }}>Sobre mim</Button>
          <Button variant="outlined">Galeria</Button>
        </Box>
      </Box>
      
      <Typography variant="h4" component="h2" gutterBottom>
        Blogs Recentes
      </Typography>
      <Grid container spacing={4} mb={14}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://via.placeholder.com/300x140?text=Blog+${item}`} // Imagem de placeholder
                alt={`Blog ${item}`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Blog {item}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Breve descrição do blog {item}.
                </Typography>
              </CardContent>
              <Box p={2}>
                <Button variant="outlined" component={Link} href={`/blog/${item}`}>Leia mais</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" component="h2" gutterBottom>
        Artigos Recentes
      </Typography>
      <Grid container spacing={4}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://via.placeholder.com/300x140?text=Artigo+${item}`} // Imagem de placeholder
                alt={`Artigo ${item}`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Artigo {item}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Breve descrição do artigo {item}.
                </Typography>
              </CardContent>
              <Box p={2}>
                <Button variant="outlined" component={Link} href={`/artigo/${item}`}>Leia mais</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;