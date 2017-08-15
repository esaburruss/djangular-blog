import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../models/blog.model';
@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.css']
})
export class BlogListItemComponent implements OnInit {
  @Input()
  public blog: Blog;
  constructor() { }

  ngOnInit() {
  }



  getNiceDate(): any {
    return this.blog.creation_date.getMonth();
  }
}
