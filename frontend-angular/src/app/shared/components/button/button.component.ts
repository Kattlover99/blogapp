import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public text?: string;
  @Input() public color: string = 'primary';
  @Input() public classCss: string = '';
  @Input() public type: string = 'button';
  @Input() public disabled: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
