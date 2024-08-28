"use client";

import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid, Container, Chip } from '@mui/material';
import Link from 'next/link';

const tags = [
  'Artigos', 'JavaScript', 'Python', 'Web Development', 
  'Machine Learning', 'Data Science', 'Front-end', 
  'Back-end', 'DevOps', 'API Development'
];

const posts = [
  { id: 1, title: 'Blog 1', description: 'Breve descrição do blog 1.', tag: 'JavaScript', image: 'https://via.placeholder.com/300x140?text=Blog+1' },
  { id: 2, title: 'Blog 2', description: 'Breve descrição do blog 2.', tag: 'Python', image: 'https://via.placeholder.com/300x140?text=Blog+2' },
  { id: 3, title: 'Blog 3', description: 'Breve descrição do blog 3.', tag: 'Machine Learning', image: 'https://via.placeholder.com/300x140?text=Blog+3' },
  // Adicione mais posts aqui
  // Suponha que existem mais de 9 posts
];

const Gallery = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(9); // Estado para controlar quantos posts são exibidos

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setVisiblePosts(9); // Reinicia a contagem de posts visíveis ao selecionar uma nova tag
  };

  const handleSeeMore = () => {
    setVisiblePosts(prev => prev + 9); // Exibe mais 9 posts ao clicar em "Veja mais"
  };

  const filteredPosts = selectedTag === 'All' ? posts : posts.filter(post => post.tag === selectedTag);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box mb={4}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="All"
            onClick={() => handleTagClick('All')}
            color={selectedTag === 'All' ? 'primary' : 'default'}
          />
          {tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => handleTagClick(tag)}
              color={selectedTag === tag ? 'primary' : 'default'}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredPosts.slice(0, visiblePosts).map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
              <Box p={2}>
                <Button variant="outlined" component={Link} href={`/blog/${post.id}`}>Leia mais</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {visiblePosts < filteredPosts.length && (
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" onClick={handleSeeMore}>Veja mais</Button>
        </Box>
      )}
    </Container>
  );
};

export default Gallery;
