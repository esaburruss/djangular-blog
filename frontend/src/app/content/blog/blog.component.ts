import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { NavService } from '../../services/nav.service';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public blog: Blog = new Blog({title: 'loading...', body:'loading...'});
  public url: string;
  private _navReady: boolean;

  constructor(
    private navService: NavService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this._navReady = this.navService.isLoaded();

    route.params.subscribe(params => {
      this.url = params['slug'];
      if(this._navReady) {
        this.loadBlog();
      }
    });

    navService.loaded$.subscribe(_navReady => {
      this._navReady = _navReady;
      this.loadBlog();
    });

  }

  ngOnInit() {
  }

  loadBlog() {
    this.navService.getContent('blog', this.url);
  }

  goBack(): void {
    this.location.back();
  }
}
