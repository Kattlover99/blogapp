import { TestBed } from '@angular/core/testing';

import { PublicacaoService } from './publicacao.service';

describe('PublicacaoService', () => {
  let service: PublicacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
