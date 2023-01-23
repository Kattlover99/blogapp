import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from './item-menu.types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private rotaAtiva: string = 'home';
  private routesMap: MenuItem = {
    home: {
      img: 'home',
      routes: ['/']
    },
    publicacao: {
      img: 'publicacao',
      routes: ['/publicacao']
    },
    perfil: {
      img: 'usuario',
      routes: ['/perfil/pessoal', '/perfil/pessoal/editar']
    }
  }

  constructor(
    private router: Router,
    private rotaAtivada: ActivatedRoute
  ) { }

ngOnInit():void{
  this.rotaAtivada.url.subscribe(()=>{
    this.definirRotaAtiva();
  })
}


  public definirRotaAtiva() {
    for (const menu in this.routesMap) {
      const rotaMenu = this.routesMap[menu];
      if (rotaMenu.routes.includes(this.router.url)) {
        this.rotaAtiva = menu;
        break;
      }
    }
  }

  public getImage(menu: string): string {
    const menuRoute = this.routesMap[menu];

    let icon = menuRoute.img

    if (menuRoute.routes.includes(this.router.url) || (this.rotaAtiva == menu)) {
      icon = menuRoute.routes.includes(this.router.url)
        ? `${menuRoute.img}Ativo` : menuRoute.img
      this.rotaAtiva = menu;
    }
    return `assets/images/${icon}.svg`



  }

  public redirectTo(menu: string): void {
    const menuRoute = this.routesMap[menu]
    this.router.navigateByUrl(menuRoute.routes[0])
  }
}
