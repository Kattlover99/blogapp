import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { CabecalhoPerfilComponent } from './cabecalho-perfil/cabecalho-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    CabecalhoPerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
