import { Content } from './content.model';
import { Image } from './image.model';

export class HtmlContent extends Content {
  public body: string;
  public images: Image[];

  constructor(obj?: any) {
    super(obj);
    this.body       = obj && obj.body        || '';
    this.images     = obj && obj.images      || '';
  }
}
