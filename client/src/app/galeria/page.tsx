"use client"

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, Grid, Container, Chip, Skeleton, TextField, InputAdornment } from '@mui/material';
import Link from 'next/link';
import { useTags } from '@/hooks/tag/useTags';
import { useBlogs } from '@/hooks/blog/useBlog';
import { Search } from 'lucide-react';
import { LoadingBlog } from '@/components/LoadingBlog';

const Gallery = () => {
  const numberVisiblePosts = 9;
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<number>(numberVisiblePosts);
  const [search, setSearch] = useState<string>('');

  const { data: tags = [] } = useTags();
  const { data: blogsResponse, isLoading, isError } = useBlogs(1, visiblePosts, selectedTag ?? undefined, search);

  useEffect(() => {
    setVisiblePosts(numberVisiblePosts);
  }, [selectedTag]);

  const handleTagClick = (id: number | null) => {
    setSelectedTag(id);
  };

  const handleSeeMore = () => {
    setVisiblePosts(prev => prev + numberVisiblePosts);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (isError) return <Typography>Error loading blogs.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom >Galeria</Typography>
      <Box mb={4}>
      <TextField
          label="Pesquise o blog"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ mb: 2, maxWidth: "400px", width: "100%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="All"
            onClick={() => handleTagClick(null)}
            color={selectedTag === null ? 'primary' : 'default'}
          />
          {tags.map(tag => (
            <Chip
              key={tag.id}
              label={tag.name}
              onClick={() => handleTagClick(tag.id)}
              color={selectedTag === tag.id ? 'primary' : 'default'}
            />
          ))}
        </Box>
      </Box>

      {
        isLoading ? (
          <LoadingBlog numberBlogs={3}/>
        ) : (
          <>
            <Grid container spacing={4}>
              {blogsResponse?.data.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.slug}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={post.cover ? `http://localhost:3001${post.cover}` : 'https://via.placeholder.com/300x140?text=No+Image'}
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
      
            {blogsResponse && blogsResponse?.data.length > visiblePosts && (
              <Box mt={4} display="flex" justifyContent="center">
                <Button variant="contained" onClick={handleSeeMore}>Veja mais</Button>
              </Box>
            )}
          </>
        )
      }

    </Container>
  );
};

export default Gallery;
