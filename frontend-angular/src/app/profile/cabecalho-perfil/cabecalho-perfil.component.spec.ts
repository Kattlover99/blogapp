import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoPerfilComponent } from './cabecalho-perfil.component';

describe('CabecalhoPerfilComponent', () => {
  let component: CabecalhoPerfilComponent;
  let fixture: ComponentFixture<CabecalhoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabecalhoPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabecalhoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
