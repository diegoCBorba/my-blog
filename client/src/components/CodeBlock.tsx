import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Copy } from 'lucide-react';

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const [copyMessage, setCopyMessage] = useState(false);
  const codeClass = className ? className.replace('language-', '') : '';
  const codeString = children?.toString();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString || '');
    setCopyMessage(true);
    setTimeout(() => setCopyMessage(false), 1000);
  };

  return (
    <Box
      component="pre"
      sx={{
        position: 'relative',
        bgcolor: '#2d2d2d',
        color: '#f8f8f2',
        borderRadius: '6px',
        overflowX: 'auto',
        fontFamily: 'Monaco, monospace',
        fontSize: '14px',
        whiteSpace: 'pre',
        wordBreak: 'break-word',
        marginBottom: '2rem',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#1e1e1e',
          color: '#858585',
          padding: '4px 8px',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          fontSize: '12px',
          lineHeight: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {codeClass}
        <Tooltip title="Copiado" open={copyMessage} arrow>
          <IconButton onClick={handleCopy} size="small">
            <Copy color="#f8f8f2" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        component="code"
        sx={{
          display: 'block',
          whiteSpace: 'pre',
          wordBreak: 'break-word',
          lineHeight: '25px',
          padding: '1rem',
          overflowY: 'auto',
          maxHeight: '400px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CodeBlock;
