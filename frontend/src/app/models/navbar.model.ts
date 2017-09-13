import { Content } from './content.model';
import { Section } from './section.model';
import { Page } from './page.model';

export class Navbar {
  public navitems: Content[];
  public home: Page;
  constructor(obj?: any) {
    this.home           = obj && obj.home        || new Page();
    this.navitems       = obj && obj.navitems    || [];
  }
}
