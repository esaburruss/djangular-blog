import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Navbar } from '../models/navbar.model';
import { Page } from '../models/page.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavService {
  private navSource = new Subject<Navbar>();
  navbar$ = this.navSource.asObservable();
  constructor(private http: Http) {

  }

  getNavbar() {
      this.http.get(
      'http://127.0.0.1:8000/api/content/navbar/')
      .subscribe((res: Response) => {
        console.log(res.json());
        this.navSource.next(new Navbar(res.json()));
      });
  }

  getPage(nav_url: string): Promise<Page> {
    if(!nav_url)
      nav_url = 'home';
    console.log("URL Clicked: " + nav_url);

    let promise = new Promise((resolve, reject) => {
      let apiUrl = 'http://127.0.0.1:8000/api/content/page/' + nav_url;
      this.http.get(apiUrl)
        .toPromise()
        .then(res => {
          console.log(res.json());
          let page = new Page(res.json().nav_title, res.json().nav_url, res.json().body);
          resolve(page);
        });
    });
    return promise;
  }
}
