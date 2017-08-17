import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { NavService } from '../services/nav.service';
import { Navbar } from '../models/navbar.model';
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
    private route: ActivatedRoute
  ) {
    this.navbarCollapsed = false;
    this.navbar = new Navbar();

    navService.navbar$.subscribe( nav => {
      this.navbar = nav;
    });
    navService.blogs$.subscribe( blogs => {
      this.blogs = blogs;
    });
  }

  ngOnInit() {
    console.log('Running');
    this.navService.getNavbar();
    this.navService.getBlogs();
  }

}
