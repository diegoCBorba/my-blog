interface Blog {
  slug: string;
  title: string;
}

export interface GroupedBlogsResponse {
  tag: string;
  blogs: Blog[];
}

export interface BlogPostResponse {
  slug: string;                // Identificador único do blog post
  cover: string | null;        // URL da imagem de capa, pode ser null
  title: string;               // Título do blog post
  description: string;         // Descrição breve do blog post
  content: string;             // Conteúdo completo do blog post
  tag: string;                 // Tag associada ao blog post
  author: string;              // Autor do blog post
  publishedDate: string;       // Data de publicação do blog post, no formato ISO 8601
  comments: Comment[];         // Lista de comentários, cada um com a interface Comment
}

// Define a interface para o objeto de comentário
export interface Comment {
  id: number;                  // Identificador único do comentário
  content: string;             // Conteúdo do comentário
  createdAt: Date;             // Data de criação do comentário
  blogId: number;              // ID do blog post ao qual o comentário pertence
  userId: number;              // ID do usuário que fez o comentário
}

export interface CreateBlogPostPayload {
  title: string;
  cover?: string;
  content: string;
  description: string;
  slug: string;
  tagId: number;
  authorId: number;
}
