# Back-end - Blog

Este é o back-end do projeto de blog, construído com Nest.js.

## Scripts Disponíveis

- `npm run build` - Constrói o projeto para produção.
- `npm run format` - Formata o código-fonte usando Prettier.
- `npm run start` - Inicia o servidor.
- `npm run start:dev` - Inicia o servidor em modo de desenvolvimento.
- `npm run start:prod` - Inicia o servidor em modo de produção.
- `npm run lint` - Executa o linter para verificar problemas no código.
- `npm run test` - Executa os testes.
- `npm run test:watch` - Executa os testes em modo de observação.
- `npm run test:cov` - Executa os testes e gera cobertura de código.
- `npm run test:e2e` - Executa testes de integração.

## Estrutura do Projeto

- `src/` - Contém o código-fonte do Nest.js.
- `test/` - Contém os testes.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

Aqui está uma introdução ao banco de dados que você pode adicionar ao final do README do seu blog:

Claro! Aqui está uma introdução ao banco de dados adaptada para PostgreSQL, com a descrição das tabelas:

---

## Banco de Dados

### Tabelas

- **User**
  - `id` SERIAL PRIMARY KEY: Identificador único do usuário.
  - `login` VARCHAR NOT NULL: Login do usuário.
  - `password` VARCHAR NOT NULL: Senha do usuário.
  - `name` VARCHAR NOT NULL: Nome completo do usuário.
  - `username` VARCHAR UNIQUE NOT NULL: Nome de usuário único.
  - `isAdmin` BOOLEAN DEFAULT FALSE: Indica se o usuário é um administrador.
  - `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP: Data e hora em que o usuário foi criado.
  
- **Tag**
  - `id` SERIAL PRIMARY KEY: Identificador único da tag.
  - `name` VARCHAR UNIQUE NOT NULL: Nome da tag.
  - `slug` VARCHAR UNIQUE NOT NULL: Slug da tag.
  
- **Blog**
  - `id` SERIAL PRIMARY KEY: Identificador único do blog.
  - `title` VARCHAR NOT NULL: Título do blog.
  - `cover` VARCHAR: URL da imagem de capa do blog (opcional).
  - `published_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP: Data de publicação do blog.
  - `content` TEXT NOT NULL: Conteúdo do blog.
  - `description` TEXT NOT NULL: Descrição do blog.
  - `slug` VARCHAR UNIQUE NOT NULL: Slug do blog.
  - `tag_id` INTEGER REFERENCES Tag(id) ON DELETE SET NULL: Identificador da tag associada.
  - `author_id` INTEGER REFERENCES User(id) ON DELETE SET NULL: Identificador do autor do blog.
  
- **Comment**
  - `id` SERIAL PRIMARY KEY: Identificador único do comentário.
  - `content` TEXT NOT NULL: Conteúdo do comentário.
  - `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP: Data e hora em que o comentário foi criado.
  - `blog_id` INTEGER REFERENCES Blog(id) ON DELETE CASCADE: Identificador do blog ao qual o comentário pertence.
  - `user_id` INTEGER REFERENCES User(id) ON DELETE SET NULL: Identificador do usuário que fez o comentário.

---
