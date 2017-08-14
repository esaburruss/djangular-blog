import { NavItem } from './navitem.model';

export class Page extends NavItem {
  public nav_url: string;
  public body: string;
  constructor(nav_title: string, nav_url: string, body?: string) {
    super(nav_title);
    this.nav_url = nav_url;
    this.body = body;
  }
}
