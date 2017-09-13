export class Image {
  public url: string;
  public height: number;
  public width: number;
  constructor(obj?: any) {
    this.url      = obj && obj.url        || '';
    this.height   = obj && obj.height     || '';
    this.width    = obj && obj.width      || '';
  }
}
