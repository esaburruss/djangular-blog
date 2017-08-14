import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { NavService } from '../services/nav.service';
import { Blog } from '../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog: Blog = new Blog({title: 'loading...', body:'loading...'});
  constructor(
    private navService: NavService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {

    this.route.paramMap
      .switchMap((params: ParamMap) => this.navService.getBlog(params.get('slug')))
      .subscribe(blog => this.blog = blog)
  }

  goBack(): void {
    this.location.back();
  }
}
