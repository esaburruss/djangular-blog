import { Image } from './image.model';

export class Profile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  facebook: string;
  twitter: string;
  instagram: string;
  pinterest: string;
  github: string;
  stackoveflow: string;
  picture: Image;

  constructor(obj?: any) {
    this.username      = obj && obj.username         || null;
    this.first_name    = obj && obj.first_name       || null;
    this.last_name     = obj && obj.last_name        || null;
    this.email         = obj && obj.email            || null;
    this.picture       = obj && obj.picture          || null;
    this.facebook      = obj && obj.facebook         || null;
    this.twitter       = obj && obj.twitter          || null;
    this.instagram     = obj && obj.instagram        || null;
    this.pinterest     = obj && obj.pinterest        || null;
    this.github        = obj && obj.github           || null;
    this.stackoveflow  = obj && obj.stackoverflow    || null;
    this.picture       = obj && obj.picture          || null;
  }
}
