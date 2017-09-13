import { Content } from './content.model';
import { Page } from './page.model';

export class Section extends Content {
  public pages: Page[];
  constructor(obj?: any) {
    super(obj);
    this.pages   = obj && obj.pages    || [];
  }
}
