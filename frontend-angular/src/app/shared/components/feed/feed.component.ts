import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { LoggedUser } from 'src/app/shared/authentication/logged-user.types';
import { FeedService } from './feed.service';
import { Post } from './post.type';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnChanges {

  public loggedUser: LoggedUser | null;
  public posts: Array<Post> = [];

  @Input() public usuario?: any;

  constructor(
    private authenticationService: AuthenticationService,
    private feedService: FeedService,
    private servicoRotaAtiva: ActivatedRoute
  ) {
    this.loggedUser = this.authenticationService.getLoggedUser()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'].previousValue !== changes['usuario'].currentValue) {
      this.carregarPostagens();
    }
  }

  ngOnInit(): void {
    this.carregarPostagens();
  }

  async carregarPostagens() {
    try {
      let result;

      if (this.usuario === null) {
        return;
      } else if (this.usuario) {
        result = await this.feedService.loadPosts(
          this.usuario._id
        );
      } else {
        ({ result } = await this.feedService.loadPosts())
      }

      this.posts = result.map((postagem: any) => ({
        ...postagem,
        usuario: postagem.usuario || {
          nome: this.usuario?.nome,
          avatar: this.usuario?.avatar
        },
        estaCurtido: postagem.likes.includes(this.loggedUser?.id || ''),
        quantidadeCurtidas: postagem.likes.length
      }) as Post);
      
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao carregar o feed!');
    }
  }
}
