import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ParamMap
} from '@angular/router';
import { Location }                 from '@angular/common';

import { NavService } from '../services/nav.service';
import { Navbar } from '../models/navbar.model';
import { Page } from '../models/page.model';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  navbar: Navbar;
  blogs: Blog[] = [];
  navbarCollapsed: boolean;

  constructor(
    private navService: NavService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.navbarCollapsed = false;
    this.navbar = new Navbar(new Page());

    /*navService.navbar$.subscribe( nav => {
      this.navbar = nav;
    });
    navService.blogs$.subscribe( blogs => {
      this.blogs = blogs;
    });*/
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.navService.getNavbar())
      .subscribe(nav => this.navbar = nav)
    //this.navService.getNavbar();
    //this.navService.getBlogs();
  }

  goBack(): void {
    this.location.back();
  }

}
