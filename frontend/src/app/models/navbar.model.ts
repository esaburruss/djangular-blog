import { NavItem } from './navitem.model';
import { Section } from './section.model';
import { Page } from './page.model';

export class Navbar {
  public navitems: NavItem[];
  constructor(navitems?: NavItem[]) {
    if(navitems) {
      this.navitems = navitems;
    } else {
      this.navitems = [];
    }
  }
}
