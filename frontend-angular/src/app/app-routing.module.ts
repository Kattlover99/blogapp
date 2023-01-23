import { keyframes } from '@angular/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/authentication/auth.guard';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((c) => c.LoginModule),
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./profile/profile.module').then((v) => v.ProfileModule)
  },
  {
    path: 'publicacao',
    canActivate: [AuthGuard],
    loadChildren: () => import('./publicacao/publicacao.module').then((x) => x.PublicacaoModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((k) => k.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
