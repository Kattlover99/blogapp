import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPublicPageComponent } from './footer-public-page.component';

describe('FooterPublicPageComponent', () => {
  let component: FooterPublicPageComponent;
  let fixture: ComponentFixture<FooterPublicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterPublicPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPublicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
