export class Content {
  public title: string;
  public slug: string;

  constructor(obj?: any) {
    this.title   = obj && obj.title   || '';
    this.slug    = obj && obj.slug    || '';
  }
}
