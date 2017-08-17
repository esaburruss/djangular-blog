import { NavItem } from './navitem.model';
import { Page } from './page.model';

export class Section extends NavItem {
  public pages: NavItem[];
  constructor(title: string, pages: Page[]) {
    super(title);
    this.pages = pages;
  }
}
