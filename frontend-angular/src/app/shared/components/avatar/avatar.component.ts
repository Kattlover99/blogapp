import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() src?: string;
  @Input() customClassName: string = '';
  constructor() {}



  public getAvatar(): string {
    if (this.src) return this.src;

    return '/assets/images/avatar.svg';
  }
}
