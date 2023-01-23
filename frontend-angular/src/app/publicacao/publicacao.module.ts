import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacaoRoutingModule } from './publicacao-routing.module';
import { PublicacaoComponent } from './publicacao.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicacaoComponent
  ],
  imports: [
    CommonModule,
    PublicacaoRoutingModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class PublicacaoModule { }
