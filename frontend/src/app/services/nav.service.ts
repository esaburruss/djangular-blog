import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Navbar } from '../models/navbar.model';
import { Nav } from '../models/nav.model';
import { Page } from '../models/page.model';
import { Blog } from '../models/blog.model';
import { Section } from '../models/section.model';
import { HtmlContent } from '../models/htmlcontent.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavService {
  private base_url: string;

  private _loadedContent: { [id:string] : HtmlContent };
  private _nav: Nav;

  private contentSource = new Subject<HtmlContent>();
  content$ = this.contentSource.asObservable();
  private _content: HtmlContent;

  private _loadedSource = new Subject<boolean>();
  loaded$ = this._loadedSource.asObservable();
  private _loaded: boolean;

  constructor(private http: Http) {
    this.base_url = 'http://127.0.0.1:8000/api/content/';
    this._loadedContent = {};
    this._content = new HtmlContent({});
    this._loaded = false;
    this._nav = new Nav({});
  }

  getNav(): Promise<Nav> {
    let promise = new Promise<Nav>((resolve, reject) => {
      this.http.get(this.base_url + 'nav/')
        .toPromise()
        .then(res => {
          this._nav = new Nav(res.json());
          resolve(this._nav);
        });
    });
    return promise;
  }

  initializeLoadedPages() {
    this._loadedContent['/'] = this._nav.navbar.home;
    for (let navitem of this._nav.navbar.navitems) {
      if((navitem as any).pages) {
        for (let page of (navitem as Section).pages) {
          this._loadedContent['page/' + (page as Page).slug] = (page as Page);
        }
      } else {
        this._loadedContent['page/' + (navitem as Page).slug] = (navitem as Page);
      }
    }
    for (let blog of this._nav.blogs) {
      this._loadedContent['blog/' + blog.slug] = blog;
    }
    this._loadedSource.next(true);
    this._loaded = true;
  }

  getContent(type: string, slug: string) {
    let url = '/';

    if(slug) {
      url = type + '/' + slug;
    }
    if(this._loadedContent[url].body) {
      this.contentSource.next(this._loadedContent[url]);
      this._content = this._loadedContent[url];
    } else {
      let apiUrl = this.base_url + url + '/';
      this.http.get(apiUrl)
      .subscribe((res: Response) => {
        this._loadedContent[url].body = res.json().body;
        this._content = this._loadedContent[url];
        this.contentSource.next(this._loadedContent[url]);
      });
    }
  }

  isLoaded() {
    return this._loaded;
  }

  getCurrentContent() {
    return this._content;
  }

  getBlogList() {
    return this._nav.blogs;
  }

  getCategoryList() {
    return this._nav.categories;
  }
}
