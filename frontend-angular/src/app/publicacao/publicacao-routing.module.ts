import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicacaoComponent } from './publicacao.component';

const routes: Routes = [
  {
    path: '',
    component: PublicacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicacaoRoutingModule { }
