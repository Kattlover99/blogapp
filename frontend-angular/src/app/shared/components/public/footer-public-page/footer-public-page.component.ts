import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-public-page',
  templateUrl: './footer-public-page.component.html',
  styleUrls: ['./footer-public-page.component.scss']
})
export class FooterPublicPageComponent implements OnInit {

  @Input() public question?:string
  @Input() public actionText?:string
  @Input() public route?:string
  constructor() { }

  ngOnInit(): void {
  }

}
