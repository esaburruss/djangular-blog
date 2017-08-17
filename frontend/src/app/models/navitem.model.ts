export class NavItem {
  public title: string;

  constructor(obj?: any) {
    this.title         = obj && obj.title            || '';
  }
}
