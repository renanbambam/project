import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isActive = false;
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    const nameValidators = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ];
    const emailValidators = [Validators.required, Validators.email];
    const passwordAndAddressValidators = [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ];
    const textValidators = [Validators.required];

    this.registerForm = this.fb.group({
      name: ['', nameValidators],
      email: ['', emailValidators],
      password: ['', passwordAndAddressValidators],
      address: ['', passwordAndAddressValidators],
      addressNumber: ['', textValidators],
      city: ['', textValidators],
      state: ['', textValidators],
      country: ['', textValidators],
      zipcode: ['', textValidators],
      birthday: ['', textValidators],
      document: ['', textValidators],
      phone: ['', textValidators],
      roles: [''],
      company_id: ['', textValidators],
      avatar: [''],
      branch_id: [''],
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    });
  }

  toggle() {
    this.isActive = !this.isActive;
  }
}
