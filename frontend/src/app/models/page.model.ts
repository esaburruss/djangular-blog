import { NavItem } from './navitem.model';

export class Page extends NavItem {
  public nav_url: string;
  public body: string;
  constructor(obj?: any) {
    super(obj);
    this.nav_url      = obj && obj.nav_url         || '';
    this.body         = obj && obj.body            || null;
  }
}
