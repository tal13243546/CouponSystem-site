import { TestBed } from '@angular/core/testing';

import { TokensManagerService } from './tokens-manager.service';

describe('TokensManagerService', () => {
  let service: TokensManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokensManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
