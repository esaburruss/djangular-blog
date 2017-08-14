import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavService } from '../services/nav.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NavService
  ],
  declarations: []
})
export class NavbarModule { }
