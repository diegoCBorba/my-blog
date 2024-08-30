import React from 'react';
import { Box } from '@mui/material';

interface InlineCodeProps {
  node: any;
  children: React.ReactNode;
}

const InlineCode = ({ node, children }: InlineCodeProps) => (
  <Box
    component="code"
    sx={{
      backgroundColor: '#e0e0e0',
      color: '#C79B65',
      padding: '0.1rem 0.4rem',
      borderRadius: '4px',
      fontFamily: 'Monaco, monospace',
    }}
  >
    {children}
  </Box>
);

export default InlineCode;
