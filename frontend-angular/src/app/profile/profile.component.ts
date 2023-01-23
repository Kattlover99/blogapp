import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication/authentication.service';
import { LoggedUser } from '../shared/authentication/logged-user.types';
import { InstagramUserApi } from '../shared/services/instagram-user-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public usuario: any | null = null;
  public usuarioLogado?: LoggedUser | null;

  constructor(
    private servicoRotaAtual: ActivatedRoute,
    private servicoUsuario: InstagramUserApi,
    private servicoAutenticacao: AuthenticationService
  ) {
    this.usuarioLogado = this.servicoAutenticacao.getLoggedUser();
  }

  ngOnInit(): void {
    this.servicoRotaAtual.params.subscribe(params => {
      let idUsuarioUrl = params['idUsuario'];
      if (idUsuarioUrl === 'pessoal') {
        idUsuarioUrl = this.usuarioLogado?.id;
      }

      this.carregarPerfilDoUsuario(idUsuarioUrl);
    });
  }

  async carregarPerfilDoUsuario(idUsuario?: string) {
    try {
      if (!idUsuario) {
        return;
      }

      this.usuario = await this.servicoUsuario.obterInformacoesDoPerfil(idUsuario);
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao carrear o perfil!');
    }
  }
}
