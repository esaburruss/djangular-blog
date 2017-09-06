import { Navbar } from './navbar.model';
import { Blog } from './blog.model';
import { Category } from './category.model';

export class Nav {
  public navbar: Navbar;
  public blogs: Blog[];
  public categories: Category[];
  constructor(obj?: any) {
    this.navbar       = obj && obj.navbar       || new Navbar({});
    this.blogs        = obj && obj.blogs        || [];
    this.categories   = obj && obj.categories   || [];
  }
}
