import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../models/blog.model';
import { NavService } from '../services/nav.service';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogs: Blog[];
  @Input()
  public big: boolean;
  private _navReady: boolean;


  constructor(
    private navService: NavService
  ) {
    this._navReady = this.navService.isLoaded();
    if(this._navReady) {
      this.loadBlogs();
    }
    navService.loaded$.subscribe(_navReady => {
      this._navReady = _navReady;
      this.loadBlogs();
    });
  }

  ngOnInit() {
  }

  loadBlogs() {
    this.blogs = this.navService.getBlogList();
  }
}
