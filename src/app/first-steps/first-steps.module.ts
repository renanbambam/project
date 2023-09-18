import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FirstStepsComponent } from './first-steps.component';

@NgModule({
  declarations: [FirstStepsComponent],
  imports: [CommonModule, RouterModule],
})
export class FirstStepsModule {}
