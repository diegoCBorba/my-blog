"use client"

import React from 'react';
import BlogForm from '@/components/BlogForm'; 
import { Container, Typography } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

const CreateBlogPage = () => {
  return (
    <ProtectedRoute requireAdmin>
      <Container>
        <Typography variant="h2" gutterBottom>
          Criar Novo Blog
        </Typography>
        <BlogForm />
      </Container>
    </ProtectedRoute>
  );
};

export default CreateBlogPage;
