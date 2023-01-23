import { Injectable } from '@angular/core';
import { UserInstagram } from '../types/user-instagram.types';
import { InstagramApiService } from './instagram-api.service';

@Injectable({
  providedIn: 'root',
})
export class InstagramUserApi extends InstagramApiService {
  public alternarSeguir(_id: string) {
    return this.put('seguir?id=' + _id, {});
  }
  public getUserData(): Promise<UserInstagram> {
    return this.get('usuario');
  }

  public searchUsers(filter: string): Promise<UserInstagram> {
    return this.get(`pesquisa?filtro=${filter}`);
  }

  public obterInformacoesDoPerfil(idUsuario: string): Promise<UserInstagram> {
    return this.get('pesquisa?id=' + idUsuario)
  }

  public atualizarPerfil(dados: any): Promise<void> {
    return this.put('usuario', dados)
  }
}
