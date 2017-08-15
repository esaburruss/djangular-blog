import {
  Component,
  OnInit,
  Input, } from '@angular/core';
import { NavService } from '../services/nav.service';
import { Navbar } from '../models/navbar.model';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbar: Navbar;
  blogs: Blog[] = [];
  navbarCollapsed: boolean;
  constructor(private navService: NavService) {
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
    this.navService.getNavbar();
    this.navService.getBlogs();
  }

}
