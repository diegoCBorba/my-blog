"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Box, Paper, TableContainer, TableHead, TableBody, TableCell, TableRow, Table, Chip } from '@mui/material';
import Image from 'next/image';
import { useBlogBySlug } from '@/hooks/blog/useBlogBySlug';
import InlineCode from '@/components/InlineCode';
import CodeBlock from '@/components/CodeBlock';
import CommentList from '@/components/CommentList';

interface Props {
  params: { slug: string };
}

const components = {
  h1: ({ ...props }: any) => <Typography variant="h1" sx={{ marginBottom: '2rem', fontSize: '45px' }} {...props} />,
  h2: ({ ...props }: any) => <Typography variant="h2" sx={{ marginBottom: '2rem', fontSize: '40px' }} {...props} />,
  h3: ({ ...props }: any) => <Typography variant="h3" sx={{ marginBottom: '1rem', fontSize: '25px' }} {...props} />,
  p: ({ ...props }: any) => <Typography paragraph sx={{ marginBottom: '1rem' }} {...props} />,
  ul: ({ ...props }: any) => <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '2rem' }} {...props} />,
  ol: ({ ...props }: any) => <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: '10px 0' }} {...props} />,
  li: ({ ...props }: any) => <li style={{ marginBottom: '5px', fontSize: '16px' }} {...props} />,
  code: ({ className, ...props }: any) => {
    const codeString = props.children.toString();
    const isInline = !codeString.includes('\n');
    return isInline ? <InlineCode {...props} /> : <CodeBlock className={className} {...props} />;
  },
  table: ({ ...props }: any) => (
    <TableContainer component={Paper} sx={{ marginBottom: '1rem' }}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: ({ ...props }: any) => <TableHead {...props} />,
  tbody: ({ ...props }: any) => <TableBody {...props} />,
  tr: ({ ...props }: any) => <TableRow {...props} />,
  td: ({ ...props }: any) => <TableCell {...props} />,
  th: ({ ...props }: any) => <TableCell {...props} />,
};

const Blogs = ({ params }: Props) => {
  const { slug } = params;
  const { data: blog, isLoading, error } = useBlogBySlug(slug);


  if (isLoading) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  if (error) {
    return <Typography variant="h6">Erro ao carregar o blog.</Typography>;
  }

  if (!blog) {
    return <Typography variant="h6">Blog não encontrado.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: '900px', padding: '2rem' }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", mb: "2rem" }}>
        <Typography variant="h1" fontSize={55}>{blog.title}</Typography>
        {blog.cover && (
          <Box sx={{ my: '2rem' }}>
            <Image 
              src={`http://localhost:3001${blog.cover}`} 
              alt={blog.title} 
              layout="responsive" 
              width={1200} 
              height={630}
            />
          </Box>
        )}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`Autor: ${blog.author} | Publicado em: ${new Date(blog.publishedDate).toLocaleDateString()}`}
        </Typography>
        <Chip label={`${blog.tag}`} sx={{ width: 'fit-content' }}/>
      </Box>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
      >
        {blog.content}
      </ReactMarkdown>
      <CommentList blogId={blog.id}/>
    </Box>
  );
};

export default Blogs;