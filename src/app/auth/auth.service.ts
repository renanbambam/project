import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/environment.prod';
import { RegisterUser } from '../shared/models/registerUser';
import { TokensService } from './tokens/tokens.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint = environment.ApiUrl;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokensService,
    private jwtService: JwtHelperService
  ) {}

  register(user: RegisterUser): Observable<any> {
    const registerUrl = `${this.endpoint}/user`;
    return this.http
      .post(registerUrl, user, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.router.navigate(['login']);
        }),
        catchError(this.handleError)
      );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.endpoint}/auth/login`, user, {
      observe: 'response',
      withCredentials: true,
    });
  }

  refreshToken(token: string) {
    const id = this.jwtService.decodeToken(token).sub;
    return this.http.post(`${this.endpoint}/auth/refresh`, {
      id,
      refreshToken: token,
    });
  }

  isLogged(): boolean {
    return (
      !!this.tokenService.getAccessToken() ||
      !!this.tokenService.getRefreshToken()
    );
  }

  logout() {
    this.tokenService.clearStorage();
    this.router.navigate(['login']);
  }

  getUserProfile(id: any): Observable<any> {
    const api = `${this.endpoint}/user/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => msg);
  }

  isAccessTokenExpired(): boolean {
    const token = this.tokenService.getAccessToken();
    return this.jwtService.isTokenExpired(token);
  }

  isRefreshTokenExpired(): boolean {
    const token = this.tokenService.getRefreshToken();
    return this.jwtService.isTokenExpired(token);
  }
}
