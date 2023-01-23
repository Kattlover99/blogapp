import { CommentPost } from './comment-post.types';

export type Post = {
  _id: string;
  idUsuario: string;
  usuario?: {
    nome: string;
    avatar: string;
  };
  descricao: string;
  foto: string;
  data: Date;
  likes: Array<string>;
  comentarios: Array<CommentPost>;
  estaCurtido?: boolean;
  quantidadeCurtidas: number;
};
