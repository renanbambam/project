import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffcanvasComponent } from './offcanvas.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OffcanvasComponent],
  imports: [CommonModule, RouterModule],
  exports: [OffcanvasComponent],
})
export class OffcanvasModule {}
