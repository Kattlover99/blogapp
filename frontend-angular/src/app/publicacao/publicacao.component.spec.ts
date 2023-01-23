import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacaoComponent } from './publicacao.component';

describe('PublicacaoComponent', () => {
  let component: PublicacaoComponent;
  let fixture: ComponentFixture<PublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
