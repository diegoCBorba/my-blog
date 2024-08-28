import React from 'react';
import BlogForm from '@/components/BlogForm'; 
import { Container, Typography } from '@mui/material';

const CreateBlogPage = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Criar Novo Blog
      </Typography>
      <BlogForm />
    </Container>
  );
};

export default CreateBlogPage;
