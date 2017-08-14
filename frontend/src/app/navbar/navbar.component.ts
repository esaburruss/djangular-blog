import {
  Component,
  OnInit,
  Input, } from '@angular/core';
import { NavService } from '../services/nav.service';
import { Navbar } from '../models/navbar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() navbar: Navbar;
  constructor(private navService: NavService) {
    this.navbar = new Navbar();
    navService.navbar$.subscribe( nav => {
      this.navbar = nav;
    });
  }

  ngOnInit() {
    this.navService.getNavbar();
  }

}
