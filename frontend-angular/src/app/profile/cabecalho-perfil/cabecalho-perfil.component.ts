/* eslint-disable no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { InstagramUserApi } from 'src/app/shared/services/instagram-user-api.service';
import { UserInstagram } from 'src/app/shared/types/user-instagram.types';

@Component({
  selector: 'app-cabecalho-perfil',
  templateUrl: './cabecalho-perfil.component.html',
  styleUrls: ['./cabecalho-perfil.component.scss']
})
export class CabecalhoPerfilComponent implements OnInit {

  @Input() usuario?: UserInstagram | null;
  public estaPerfilPessoal: boolean = false;

  constructor(
    private rotaAtiva: ActivatedRoute,
    private router: Router,
    private servicoUsuario: InstagramUserApi,
    private autenticacaoService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.rotaAtiva.url.subscribe(() => {
      if (this.router.url === '/perfil/pessoal') {
        this.estaPerfilPessoal = true
      }
    })
  }

  public voltarParaHome() {
    this.router.navigateByUrl('/')
  }

  public async manipularCliqueDoBotaoPrincipal() {
    if (this.estaPerfilPessoal) {
      this.redirecionarParaTelaDeEdicaoPerfil();
      return;
    }

    await this.alternarSeguir()

  }

  private async alternarSeguir(): Promise<void> {
    if (!this.usuario) return;

    try {
      await this.servicoUsuario.alternarSeguir(this.usuario?._id)
      this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario
    } catch (error: any) {
      alert(error?.error?.error || 'Erro ao Seguir/Deixar de seguir.')
    }
  }

  private redirecionarParaTelaDeEdicaoPerfil() {
    this.router.navigateByUrl('/perfil/pessoal/editar');
  }

  public obterTextoBotaoPrincipal(): string {
    if (this.estaPerfilPessoal) {
      return 'Editar Perfil';
    }

    if (this.usuario?.segueEsseUsuario) {
      return 'Deixar de seguir';
    }
    return 'Seguir'
  }

  public obterCorBotaoPrincipal() {
    if (this.usuario?.segueEsseUsuario || this.estaPerfilPessoal) {
      return 'outline'
    }
    return 'primary'
  }

  public logout() {
    this.autenticacaoService.logout()
  }
}
