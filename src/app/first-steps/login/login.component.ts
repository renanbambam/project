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
import { CustomValidators } from 'src/app/shared/validators/login-validator';

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
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, CustomValidators.emailOrUsername]],
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
    const emailOrUsername = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const user = emailOrUsername.includes('@')
      ? { email: emailOrUsername, password: password }
      : { name: emailOrUsername, password: password };

    return this.authService.login(user).subscribe({
      next: (res) => {
        const { accessToken, refreshToken } = res.body;
        if (accessToken && refreshToken) {
          this.tokensService.saveAccessAndRefreshToken(
            accessToken,
            refreshToken
          );
          this.router.navigateByUrl('/dashboard');
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
