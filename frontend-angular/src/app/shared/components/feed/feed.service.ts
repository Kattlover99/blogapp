import { Injectable } from '@angular/core';
import { InstagramApiService } from '../../services/instagram-api.service';
import { ResponseInstagramApi } from '../../types/response-api-instagram.type';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends InstagramApiService {

  async loadPosts(idUsuario?: string): Promise<any> {
    return this.get(`feed${idUsuario ? `?id=` + idUsuario : ''}`);
  }

  async alternateLikeDislike(postId: string): Promise<ResponseInstagramApi> {
    return this.put(`like?id=${postId}`, {});
  }

  async addCommentToPost(postId: string, comment: string): Promise<any> {
    return this.put(`comments?id=${postId}`, { comentario: comment })
  }
}
