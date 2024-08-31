export interface CreateCommentPayload{
  content: string;
  blogId: number;
  userId: number;
}


export interface CommentResponse {
  id: number;                  // Identificador único do comentário
  idUser: number;
  content: string;             // Conteúdo do comentário
  createdAt: string;           // Data de criação do comentário, como string no formato ISO 8601
  name: string;                // Nome do usuário que fez o comentário
  username: string;            // Username do usuário que fez o comentário
}
