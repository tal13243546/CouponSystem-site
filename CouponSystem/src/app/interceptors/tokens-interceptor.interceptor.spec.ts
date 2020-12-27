import { TestBed } from '@angular/core/testing';

import { TokensInterceptorInterceptor } from './tokens-interceptor.interceptor';

describe('TokensInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokensInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokensInterceptorInterceptor = TestBed.inject(TokensInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
