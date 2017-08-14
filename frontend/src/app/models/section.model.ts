import { NavItem } from './navitem.model';
import { Page } from './page.model';

export class Section extends NavItem {
  public nav_pages: NavItem[];
  constructor(nav_title: string, nav_pages: Page[]) {
    super(nav_title);
    this.nav_pages = nav_pages;
  }
}
