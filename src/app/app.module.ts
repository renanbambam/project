import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './layout/home/home.module';
import { RegisterModule } from './first-steps/register/register.module';
import { LoginModule } from './first-steps/login/login.module';
import { LayoutModule } from './layout/layout.module';
import { environment } from 'src/enviroments/environment.prod';
import { TokensService } from './auth/tokens/tokens.service';
import { FirstStepsModule } from './first-steps/first-steps.module';

export function jwtOptionsFactory(tokensService: TokensService) {
  return {
    tokenGetter: () => {
      return tokensService.getAccessToken();
    },
    whitelistedDomains: [environment.ApiUrl],
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterModule,
    LoginModule,
    LayoutModule,
    FirstStepsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokensService],
      },
    }),
    AppRoutingModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
