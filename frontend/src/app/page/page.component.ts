import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { NavService } from '../services/nav.service';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  page: Page;
  constructor(
    private navService: NavService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.page = new Page('Loading..', 'loading', 'Loading...');
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.navService.getPage(params.get('nav_url')))
      .subscribe(page => this.page = page)
  }

  goBack(): void {
    this.location.back();
  }
}
