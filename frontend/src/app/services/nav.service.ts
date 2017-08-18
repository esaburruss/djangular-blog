import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Navbar } from '../models/navbar.model';
import { Page } from '../models/page.model';
import { Blog } from '../models/blog.model';
import { Section } from '../models/section.model';
import { Content } from '../models/content.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavService {
  private base_url: string;

  private _loadedContent: { [id:string] : Content };
  private _navbar: Navbar;

  private contentSource = new Subject<Content>();
  content$ = this.contentSource.asObservable();

  private _loadedSource = new Subject<boolean>();
  loaded$ = this._loadedSource.asObservable();

  private blogsSource = new Subject<Blog[]>();
  blogs$ = this.blogsSource.asObservable();

  constructor(private http: Http) {
    this.base_url = 'http://127.0.0.1:8000/api/content/';
    this._loadedContent = {};
  }

  getNavbar(): Promise<Navbar> {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.base_url + 'navbar/')
        .toPromise()
        .then(res => {
          this._navbar = new Navbar(res.json());
          resolve(this._navbar);
        });
    });
    return promise;
  }

  initializeLoadedPages() {
    this._loadedContent['/'] = this._navbar.home;
    for (let navitem of this._navbar.navitems) {
      if((navitem as any).pages) {
        for (let page of (navitem as Section).pages) {
          this._loadedContent['page/' + (page as Page).slug] = (page as Page);
        }
      } else {
        this._loadedContent['page/' + (navitem as Page).slug] = (navitem as Page);
      }
    }
    this._loadedSource.next(true);
  }

  getContent(type: string, slug: string) {
    let url = '/';
    console.log(slug);
    if(slug) {
      url = type + '/' + slug;
    }
    console.log(this._loadedContent[url].body);
    if(this._loadedContent[url].body) {
      console.log('Did not do HTTP');
      this.contentSource.next(this._loadedContent[url]);
    } else {
      let apiUrl = this.base_url + url + '/';
      this.http.get(apiUrl)
      .subscribe((res: Response) => {
        this._loadedContent[url].body = res.json().body
        this.contentSource.next(this._loadedContent[url]);
      });
    }
  }

  getHomePage() {
      this.http.get(this.base_url + 'home/')
      .subscribe((res: Response) => {
        console.log(res.json());
        //this.navSource.next(new Navbar(res.json()));
      });
  }

  getPage(slug: string): Promise<Page> {
    if(!slug)
      slug = 'home';
    console.log("URL Clicked: " + slug);
    let apiUrl = this.base_url + 'page/' + slug + '/';
    console.log(apiUrl);
    let promise = new Promise((resolve, reject) => {
      this.http.get(apiUrl)
        .toPromise()
        .then(res => {
          console.log(res.json());
          let page = new Page(res.json());
          resolve(page);
        });
    });
    return promise;
  }

  getBlog(slug: string): Promise<Blog> {
    let promise = new Promise((resolve, reject) => {
      let apiUrl = this.base_url + 'blog/' + slug + '/';
      this.http.get(apiUrl)
        .toPromise()
        .then(res => {
          console.log(res.json());
          resolve(res.json());
        });
    });
    return promise;
  }

  getBlogs() {
    let apiUrl = this.base_url + 'blog/';
    this.http.get(apiUrl)
    .subscribe((res: Response) => {
      console.log(res.json());
      this.blogsSource.next(res.json().results);
    });
  }
}
