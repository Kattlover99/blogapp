import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../components/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class InstagramApiInterceptor implements HttpInterceptor {
  private requisicoesEmAndamento: number = 0;

  constructor(
    private loadingService: LoadingService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requisicoesEmAndamento++;
    if (this.requisicoesEmAndamento === 1) {
      this.loadingService.exibir();
    }
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('token');
    let newReq = req;
    if (token) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(newReq).pipe(
      delay(2000),
      finalize(() => {
        this.requisicoesEmAndamento--;
        if (this.requisicoesEmAndamento === 0) {
          this.loadingService.ocultar();
        }
      })
    );
  }
}
