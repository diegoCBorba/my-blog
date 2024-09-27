interface Blog {
  slug: string;
  title: string;
}

export interface GroupedBlogsResponse {
  tag: string;
  blogs: Blog[];
}

export interface BlogPostResponse {
  id: number;                  // Identificador único do blog post
  slug: string;                // Identificador único do blog post
  cover: string | null;        // URL da imagem de capa, pode ser null
  title: string;               // Título do blog post
  description: string;         // Descrição breve do blog post
  content: string;             // Conteúdo completo do blog post
  tag: string;                 // Tag associada ao blog post
  author: string;              // Nome do autor do blog post
  publishedDate: string;       // Data de publicação do blog post, no formato ISO 8601
}

export interface CreateBlogPostPayload {
  title: string;
  cover?: File;
  content: string;
  description: string;
  slug: string;
  tagId: number;
  authorId: number;
}

interface BlogAll {
  slug: string;
  cover?: string;
  title: string;
  description: string;
  tag: string;
}

export interface BlogsResponse {
  data: BlogAll[];
  totalPages: number;
}