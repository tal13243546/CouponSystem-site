import { TokensManagerService } from 'src/app/services/tokens-manager.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokensInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: TokensManagerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string;
    token = this.authService.getLoginResponse().token;
    if (token){
      request = request.clone({
        setHeaders: {
            Authorization: token
        }
    });
    }
    return next.handle(request);
  }
}
