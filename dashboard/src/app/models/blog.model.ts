import { HtmlContent } from './htmlcontent.model';
import { Category } from './category.model';
import { Profile } from './profile.model';
export class Blog extends HtmlContent {
  categories: Category[];
  creation_date: Date;
  author: Profile;
  constructor(obj?: any) {
    super(obj);
    this.categories    = obj && obj.categories       || [];
    this.creation_date = obj && obj.creation_date    || new Date();
    this.author        = obj && obj.author           || new Profile();
  }
}
