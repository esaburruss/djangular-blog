import { Category } from './category.model';
import { Profile } from './profile.model';
export class Blog {
  title: string;
  slug: string;
  body: string;
  categories: Category[];
  date_created: Date;
  author: Profile;
  constructor(obj?: any) {
    this.title         = obj && obj.title            || '';
    this.slug          = obj && obj.slug             || '';
    this.body          = obj && obj.body             || '';
    this.categories    = obj && obj.categories       || [];
    this.date_created  = obj && obj.date_created     || new Date();
    this.author        = obj && obj.author           || new Profile();
  }
}
