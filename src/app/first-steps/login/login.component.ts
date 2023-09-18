import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user';
import { TokensService } from '../../auth/tokens/tokens.service';

@Component({
  selector: 'app-login',
  host: {
    class: 'login-outlet',
  },
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  fromUrl!: string;
  loginForm!: FormGroup;
  isActive = false;
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private tokensService: TokensService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    const teste = setInterval(() => {
      if (this.userNameInput.nativeElement) {
        this.userNameInput.nativeElement.focus();
        clearInterval(teste);
      }
    }, 100);
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const user: User = {
      email: email,
      password: password,
    };

    return this.authService.login(user).subscribe({
      next: (res) => {
        const { access_token, refresh_token } = res.body;
        if (access_token && refresh_token) {
          this.tokensService.saveAccessAndRefreshToken(
            access_token,
            refresh_token
          );
          this.router.navigateByUrl('/home');
        }
      },
      error: (error) => {
        this.authService.handleError(error);
      },
    });
  }

  toggle() {
    this.isActive = !this.isActive;
  }
}
