import { Component, Input } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { LoggedUser } from 'src/app/shared/authentication/logged-user.types';
import { FeedService } from '../feed.service';
import { Post } from '../post.type';

const descriptionCharatersLimit = 90;

@Component({
  selector: 'app-post-description',
  templateUrl: './post-description.component.html',
  styleUrls: ['./post-description.component.scss']
})
export class PostDescriptionComponent {

  @Input() public post?: any = {} as Post
  @Input() public loggedUser?: LoggedUser | null = null;

  public quantityOfRowsTextarea: number = 1;
  public currentComment: string = ''
  public alternateShowCommentBox: boolean = false;
  public descriptionCharatersLimit: number = descriptionCharatersLimit;
  public isMakingAnBackendCall: boolean = false;

  constructor(private feedService: FeedService) { }

  public showFullDescription(): void {
    this.descriptionCharatersLimit = 99999;
  }


  public changeExibitionCommentBox(): void {
    this.alternateShowCommentBox = !this.alternateShowCommentBox;
  }

  public getCommentImage(): string {
    const baseIcon = this.alternateShowCommentBox ?
      'comentarioAtivo.svg'
      : 'comentario.svg';
    return `assets/images/${baseIcon}`;
  }

  public async makeComment() {
    if (!this.validateComment()) return;
    this.isMakingAnBackendCall = true;

    try {
      await this.feedService.addCommentToPost(
        this.post._id,
        this.currentComment);

      this.post.comentarios.push({
        comentario: this.currentComment,
        nome: this.loggedUser?.nome
      })

      this.currentComment = '';
      this.changeExibitionCommentBox();

      this.isMakingAnBackendCall = false;
    } catch (error: any) {
      alert(error?.error?.error || 'Erro ao fazer comentário.')
    }
  }

  public validateComment(): boolean {
    return !this.isMakingAnBackendCall && this.currentComment.trim().length >= 3;
  }

  public checkRowsNumber() {
    this.quantityOfRowsTextarea = this.currentComment.length > 0 ? 2 : 1
  }

  public async handleLikeButton() {
    try {
      await this.feedService.alternateLikeDislike(this.post._id)

      if (this.post.estaCurtido) {
        this.post.quantidadeCurtidas--;
      } else {
        this.post.quantidadeCurtidas++;
      }

      this.post.estaCurtido = !this.post.estaCurtido;

    } catch (error: any) {
      alert(error?.error?.error || "Erro ao Curtir/Descurtir")
    }
  }

  public getLikeImage(): string {
    return `assets/images/${this.post.estaCurtido ? 'descurtir.svg' : 'curtir.svg'}`
  }

  public obterUrlPerfil():string{
    let idUsuarioPostagem = this.post.idUsuario;
    if (idUsuarioPostagem===this.loggedUser?.id){
      idUsuarioPostagem='pessoal'
    }
    return '/perfil/' + idUsuarioPostagem;
  }
}
