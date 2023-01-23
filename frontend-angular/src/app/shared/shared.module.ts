import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonComponent } from './components/button/button.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { InstagramApiInterceptor } from './services/instagram-api-interceptor.service';
import { FeedComponent } from './components/feed/feed.component';
import { PublicInputComponent } from './components/public/public-input/public-input.component';
import { PublicPageComponent } from './components/public/public-page/public-page.component';
import { FooterPublicPageComponent } from './components/public/footer-public-page/footer-public-page.component';
import { PostDescriptionComponent } from './components/feed/post-description/post-description.component';
import { CabecalhoComAcoesComponent } from './components/cabecalho-com-acoes/cabecalho-com-acoes.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  providers: [
    {
      provide: 'INSTAGRAM_URL_API',
      useValue: environment.instagramUrlApi,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InstagramApiInterceptor,
      multi: true,
    },
  ],
  declarations: [
    ButtonComponent,
    AvatarComponent,
    UploadImageComponent,
    PublicInputComponent,
    PublicPageComponent,
    FooterPublicPageComponent,
    FeedComponent,
    PostDescriptionComponent,
    CabecalhoComAcoesComponent,
    LoadingComponent,

  ],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  exports: [
    ButtonComponent,
    AvatarComponent,
    UploadImageComponent,
    PublicInputComponent,
    PublicPageComponent,
    FooterPublicPageComponent,
    FeedComponent,
    ButtonComponent,
    PostDescriptionComponent,
    CabecalhoComAcoesComponent,
  ],
})
export class SharedModule {}
