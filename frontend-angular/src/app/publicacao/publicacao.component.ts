import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacaoService } from './publicacao.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.scss']
})
export class PublicacaoComponent implements OnInit {


  public form: FormGroup;
  public etapaAtual: number = 1;
  public imagemPrevisualizacao?: string;

  constructor(
    private fb: FormBuilder,
    private servicoPublicacao: PublicacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      file: [null, Validators.required],
      descricao: [null, [Validators.required, Validators.minLength(3)]]
    })
  }


  public obterReferenciaInput(nomeInput: string): AbstractControl {
    return this.form.controls[nomeInput];
  }

  public obterImagemEsquerda(): string {
    if (this.estaNaSegundaEtapa()) {
      return 'assets/images/setaEsquerda.svg';
    }

    return '';
  }

  public obterTextoAcaoDireita() {
    if (this.estaNaSegundaEtapa()) {
      return 'Compartilhar';
    }

    if (this.obterReferenciaInput('file').value) {
      return 'Avançar';
    }

    return '';
  }

  public estaNaPrimeiraEtapa() {
    return this.etapaAtual === 1;
  }

  public estaNaSegundaEtapa() {
    return this.etapaAtual === 2;
  }

  public manipularCliqueAcaoEsquerda() {
    if (this.estaNaSegundaEtapa()) {
      this.etapaAtual = 1;
    }
  }

  public manipularCliqueAcaoDireita() {
    if (this.estaNaSegundaEtapa()) {
      this.cadastrarPublicacao();
      return;
    }

    this.etapaAtual = 2;
  }

  private async cadastrarPublicacao() {
    if (this.form.invalid) {
      return;
    }

    try {
      const valoresFormulario = this.form.value;
      const dadosFormulario = new FormData();
      dadosFormulario.append('file', valoresFormulario.file);
      dadosFormulario.append('descricao', valoresFormulario.descricao);

      await this.servicoPublicacao.publicar(dadosFormulario);
      this.router.navigateByUrl('/');
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao cadastrar a publicação!');
    }
  }

  public verificarHabilitacaoAcaoDireita(): boolean {
    return this.estaNaSegundaEtapa() && this.form.invalid;
  }

  public armazenarImagemPrevisualizacao(imgPrevisualizacao: string) {
    this.imagemPrevisualizacao = imgPrevisualizacao;
  }

  public obterImagemPrevisualizacao() {
    if (this.imagemPrevisualizacao) {
      return this.imagemPrevisualizacao;
    }

    return 'assets/images/imagemPublicacao.svg';
  }

  public obterClasseCssCabecalho() {
    if (this.obterReferenciaInput('file').value) {
      return 'cabecalhoComAcoesPublicacao';
    }

    return '';
  }

  ngOnInit(): void {
  }


}
