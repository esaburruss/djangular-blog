import { Content } from './content.model';
import { Blog } from './blog.model';

export class Category extends Content {
  public blogs: Blog[];
  constructor(obj?: any) {
    super(obj);
    this.blogs       = obj && obj.blogs    || [];
  }
}
