import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../models/blog.model';
@Component({
  selector: 'app-blog-list-page',
  templateUrl: './blog-list-page.component.html',
  styleUrls: ['./blog-list-page.component.css']
})
export class BlogListPageComponent implements OnInit {
  @Input()
  public blog: Blog;
  constructor() { }

  ngOnInit() {
  }



  getNiceDate(): any {
    return this.blog.creation_date.getMonth();
  }
}
