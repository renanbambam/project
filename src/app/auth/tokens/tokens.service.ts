import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  constructor(private cookieService: CookieService) {}

  public clearStorage() {
    this.cookieService.deleteAll();
  }

  public saveAccessAndRefreshToken(access: string, refresh: string): void {
    let date = moment();
    let expiresAccess: any = date.add(15, 'm');
    let expiresRefresh: any = date.add(7, 'd');

    this.cookieService.delete('access_token');
    this.cookieService.set('access_token', access, {
      expires: expiresAccess['_d'],
      sameSite: 'Lax',
    });

    this.cookieService.delete('refresh_token');
    this.cookieService.set('refresh_token', refresh, {
      expires: expiresRefresh['_d'],
      sameSite: 'Lax',
    });
  }

  public getAccessToken(): string | null {
    return this.cookieService.get('access_token');
  }

  public getRefreshToken(): string | null {
    return this.cookieService.get('refresh_token');
  }
}
