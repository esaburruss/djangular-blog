import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NavService } from '../services/nav.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
  ],
  providers: [
    NavService
  ],
  declarations: []
})
export class NavbarModule { }
