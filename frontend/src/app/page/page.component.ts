import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { HtmlContentComponent } from '../html-content/html-content.component';

import { NavService } from '../services/nav.service';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  public page: Page;
  public url: string;
  private _navReady: boolean;

  constructor(
    private navService: NavService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.page = new Page({'title':'unchanged','body':'<p>AAA</p>'});
    this._navReady = this.navService.isLoaded();
    route.params.subscribe(params => {
      this.url = params['slug'];
      if(this._navReady) {
        this.loadPage();
      }
    });

    navService.loaded$.subscribe(_navReady => {
      this._navReady = _navReady;
      this.loadPage();
    });
  }

  ngOnInit() {
  }

  loadPage() {
    this.navService.getContent('page', this.url);
  }

  goBack(): void {
    this.location.back();
  }
}
