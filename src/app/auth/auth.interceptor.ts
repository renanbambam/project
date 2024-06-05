import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';

import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TokensService } from './tokens/tokens.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokensService: TokensService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = this.tokensService.getAccessToken();

    if (!this.authService.isAccessTokenExpired() && token != null) {
      request = this.addTokenHeader(request, token);
    }

    return next.handle(request).pipe(
      catchError((error): any => {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('/register') &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
        }
        throw error;
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.tokensService.getRefreshToken();
      const accessExpired = this.authService.isAccessTokenExpired();
      const refreshExpired = this.authService.isRefreshTokenExpired();

      if (accessExpired && refreshExpired) {
        this.tokensService.clearStorage();
        this.router.navigateByUrl('/login');
      }

      if (accessExpired && !refreshExpired && refreshToken !== null) {
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokensService.saveAccessAndRefreshToken(
              token.access_token,
              token.refresh_token
            );
            this.refreshTokenSubject.next(token.access_token);

            return next.handle(
              this.addTokenHeader(request, token.access_token)
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;
            return throwError(() => err);
          })
        );
      }

      return this.refreshTokenSubject.pipe(
        filter((result) => result !== null),
        take(1),
        switchMap((token): any => {
          next.handle(this.addTokenHeader(request, token));
        })
      );
    }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
