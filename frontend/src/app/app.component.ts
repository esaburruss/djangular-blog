import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ParamMap
} from '@angular/router';
import { Location } from '@angular/common';

import { NavService } from './services/nav.service';
import { Navbar } from './models/navbar.model';
import { Nav } from './models/nav.model';
import { Page } from './models/page.model';
import { Blog } from './models/blog.model';
import { Category } from './models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  navbar: Navbar;
  blogs: Blog[] = [];
  categories: Category[] = [];
  navbarCollapsed: boolean;

  constructor(
    private navService: NavService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.navbarCollapsed = false;
    this.navbar = new Navbar({});
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.navService.getNav())
      .subscribe(nav => {
        this.navbar = nav.navbar;
        this.blogs = nav.blogs;
        this.categories = nav.categories;
        this.navService.initializeLoadedPages();
      });
  }

  goBack(): void {
    this.location.back();
  }
}
