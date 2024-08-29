"use client"

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, List, ListItem, Box, IconButton } from '@mui/material';
import { Copy } from 'lucide-react';

interface Props {
  params: { slug: string };
}

const markdownContent = `
# O que é NestJS?

NestJS é um framework para Node.js que facilita a construção de aplicativos escaláveis e eficientes. Ele é inspirado por Angular e utiliza TypeScript, proporcionando uma estrutura sólida e modular para o desenvolvimento de aplicações server-side.

## Principais Características

1. **Modularidade**: NestJS adota uma arquitetura modular, o que facilita a organização do código em módulos reutilizáveis e desacoplados.
2. **TypeScript**: O framework é escrito em TypeScript, proporcionando uma experiência de desenvolvimento tipada e segura.
3. **Injeção de Dependências**: Inclui um sistema de injeção de dependências robusto que facilita a gestão de serviços e dependências.
4. **Suporte a MVC**: Oferece suporte a Model-View-Controller (MVC), promovendo uma estrutura clara e organizada para o desenvolvimento de aplicativos.
5. **Integração com Outros Frameworks**: Possui integração fácil com diversos frameworks e bibliotecas, como TypeORM, Mongoose e GraphQL.

## Exemplo Básico

Aqui está um exemplo simples de como criar um módulo e um controlador em NestJS:

\`\`\`typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
\`\`\`

E o controlador correspondente:

\`\`\`typescript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
\`\`\`

## Conclusão

NestJS é uma escolha poderosa para desenvolvedores que buscam uma abordagem estruturada e escalável para o desenvolvimento de aplicações server-side com Node.js. Sua arquitetura modular e o suporte a TypeScript o tornam uma ferramenta eficaz para projetos de diversos tamanhos e complexidades.
`;

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const codeClass = className ? className.replace('language-', '') : '';
  const codeString = children.toString();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
  };

  return (
    <Box
      component="pre"
      sx={{
        position: 'relative',
        bgcolor: '#2d2d2d',
        color: '#f8f8f2',
        padding: '16px',
        borderRadius: '6px',
        overflowX: 'auto',
        fontFamily: 'Monaco, monospace',
        fontSize: '14px',
        whiteSpace: 'pre',
        wordBreak: 'break-word',
        marginTop: '20px',
      }}
      {...props}
    >
      <IconButton
        onClick={handleCopy}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: '#f8f8f2',
          zIndex: 1,
        }}
        size="small"
      >
        <Copy />
      </IconButton>
      <Box
        component="code"
        sx={{
          display: 'block',
          whiteSpace: 'pre',
          wordBreak: 'break-word',
          ml: "2rem",
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '0',
          top: '0',
          bottom: '0',
          width: '40px',
          backgroundColor: '#1e1e1e',
          color: '#858585',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px',
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
          fontSize: '12px',
          lineHeight: '20px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        {Array.from(Array((codeString.match(/\n/g) || []).length + 1).keys()).map(n => (
          <Box key={n} sx={{ height: '20px' }}>{n + 1}</Box>
        ))}
      </Box>
    </Box>
  );
};

const components = {
  h1: ({ node, ...props }: any) => <Typography variant="h1" {...props} />,
  h2: ({ node, ...props }: any) => <Typography variant="h2" {...props} />,
  h3: ({ node, ...props }: any) => <Typography variant="h3" {...props} />,
  p: ({ node, ...props }: any) => <Typography paragraph {...props} />,
  ul: ({ node, ...props }: any) => <List {...props} />,
  li: ({ node, ...props }: any) => <ListItem {...props} />,
  code: CodeBlock,
};

const Blogs = ({ params }: Props) => {
  return (
    <Box sx={{ maxWidth: "900px" }}>
      <ReactMarkdown 
        components={components} 
        remarkPlugins={[remarkGfm]}
      >
        {markdownContent}
      </ReactMarkdown>
    </Box>
  );
};

export default Blogs;
