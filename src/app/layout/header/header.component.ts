import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/environment.prod';
import { Router } from '@angular/router';
import { TokensService } from 'src/app/auth/tokens/tokens.service';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { EventData } from 'src/app/shared/event.class';

@Component({
  selector: 'app-header',
  animations: [
    trigger('profileAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.3s', style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profile = false;
  active = false;
  endpoint = environment.ApiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  width: any;
  email!: string;
  name!: string;
  content?: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokensService: TokensService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    const accessToken = this.tokensService.getAccessToken();

    if (accessToken !== null) {
      this.http
        .get(`${this.endpoint}/user`, {
          headers: this.headers,
          withCredentials: true,
        })
        .subscribe({
          next: (res: any) => {
            this.email = res['email'];
            this.name = res['name'];
          },
          error: (err) => {
            if (err.status === 403)
              this.eventBusService.emit(new EventData('logout', null));
          },
        });
    }
  }

  activate() {
    this.active = !this.active;
  }

  showProfile() {
    this.profile = !this.profile;
  }

  logout() {
    this.tokensService.clearStorage();
    this.router.navigate(['login']);
  }
}
