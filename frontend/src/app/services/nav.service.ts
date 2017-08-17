import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Navbar } from '../models/navbar.model';
import { Page } from '../models/page.model';
import { Blog } from '../models/blog.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavService {
  private base_url: string;

  private navSource = new Subject<Navbar>();
  navbar$ = this.navSource.asObservable();

  private blogsSource = new Subject<Blog[]>();
  blogs$ = this.blogsSource.asObservable();

  constructor(private http: Http) {
    this.base_url = 'http://127.0.0.1:8000/api/content/';
  }

  getNavbar(): Promise<Navbar> {
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.base_url + 'navbar/')
        .toPromise()
        .then(res => {
          resolve(new Navbar(res.json()));
        });
    });
    return promise;
  }

  getHomePage() {
      this.http.get(this.base_url + 'home/')
      .subscribe((res: Response) => {
        console.log(res.json());
        this.navSource.next(new Navbar(res.json()));
      });
  }

  getPage(nav_url: string): Promise<Page> {
    if(!nav_url)
      nav_url = 'home';
    console.log("URL Clicked: " + nav_url);
    let apiUrl = this.base_url + 'page/' + nav_url + '/';
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
