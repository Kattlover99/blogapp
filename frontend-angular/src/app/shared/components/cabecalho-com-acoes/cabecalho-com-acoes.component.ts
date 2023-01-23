import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cabecalho-com-acoes',
  templateUrl: './cabecalho-com-acoes.component.html',
  styleUrls: ['./cabecalho-com-acoes.component.scss']
})
export class CabecalhoComAcoesComponent {

  @Input() srcImagemEsquerda?: string;
  @Input() textoAcaoEsquerda?: string;
  @Input() textoAcaoDireita: string = '';
  @Input() titulo: string = '';
  @Input() desabilitarAcaoDireita: boolean = false
  @Input() classeCss?: string;

  @Output() aoClicarAcaoEsquerda: EventEmitter<any> = new EventEmitter();
  @Output() aoClicarAcaoDireita: EventEmitter<any> = new EventEmitter();

  constructor() { }



}
