import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoComAcoesComponent } from './cabecalho-com-acoes.component';

describe('CabecalhoComAcoesComponent', () => {
  let component: CabecalhoComAcoesComponent;
  let fixture: ComponentFixture<CabecalhoComAcoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecalhoComAcoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabecalhoComAcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
