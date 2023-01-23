import { Injectable } from '@angular/core';
import { InstagramApiService } from '../shared/services/instagram-api.service';
import { ResponseInstagramApi } from '../shared/types/response-api-instagram.type';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService extends InstagramApiService {
  public publicar(dadosPublicacao: FormData): Promise<ResponseInstagramApi> {
    return this.post('publicacao', dadosPublicacao);
  }
}
