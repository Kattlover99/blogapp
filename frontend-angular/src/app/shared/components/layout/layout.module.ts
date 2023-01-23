import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
