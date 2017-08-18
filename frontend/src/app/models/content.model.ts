import { NavItem } from './navitem.model';

export class Content extends NavItem {
  public body: string;
  public slug: string;

  constructor(obj?: any) {
    super(obj);
    this.body    = obj && obj.body            || '';
    this.slug    = obj && obj.slug            || '';
  }
}
