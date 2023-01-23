import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { LoggedUser } from 'src/app/shared/authentication/logged-user.types';
import { InstagramUserApi } from 'src/app/shared/services/instagram-user-api.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  public usuarioLogado?: LoggedUser | null;
  public form: FormGroup;
  public imagemPrevisualizacao?: string

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private servicoAutenticacao: AuthenticationService,
    private usuarioApi: InstagramUserApi
  ) {
    this.usuarioLogado = this.servicoAutenticacao.getLoggedUser()

    this.form = this.fb.group({
      file: [null],
      nome: [this.usuarioLogado?.nome, [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  public obterReferenciaInput(nomeInput: string): AbstractControl {
    return this.form.controls[nomeInput]
  }

  public voltarParaHome() {
    this.router.navigateByUrl('/')
  }

  public async atualizarPerfil(): Promise<void> {
    if (this.form.invalid) return;

    try {
      const valorFormulario = this.form.value;
      const payload = new FormData();
      payload.append('nome', valorFormulario.nome)
      if (valorFormulario.file) {
        payload.append('file', valorFormulario.file)
      }


      await this.usuarioApi.atualizarPerfil(payload);
      localStorage.setItem('nome', valorFormulario.nome)
      if (this.imagemPrevisualizacao) {
        localStorage.setItem('avatar', this.imagemPrevisualizacao);
      }



      this.router.navigateByUrl('/perfil/pessoal')
    } catch (error: any) {
      alert(error?.error?.error || 'Erro ao atualizar usuário')
    }
  }

  public limparInputNome() {
    this.obterReferenciaInput('nome').setValue('')
  }

  public manipularAtualizacaoImagem(imagePreview: string): void {
    this.imagemPrevisualizacao = imagePreview;
  }

}
