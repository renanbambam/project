import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { RegisterComponent } from './first-steps/register/register.component';
import { LoginComponent } from './first-steps/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { LoginGuard } from './auth/guards/login.guard';
import { FirstStepsComponent } from './first-steps/first-steps.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: FirstStepsComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
        canActivate: [LoginGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Register' },
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home' },
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
