import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: ':idUsuario',
    component: ProfileComponent
  },
  {
    path: 'pessoal/editar',
    component: EditarPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
