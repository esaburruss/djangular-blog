import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { NavService } from '../services/nav.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: Category[];
  private _navReady: boolean;

  constructor(
    private navService: NavService
  ) {
    this._navReady = this.navService.isLoaded();
    if(this._navReady) {
      this.loadCategories();
    }
    navService.loaded$.subscribe(_navReady => {
      this._navReady = _navReady;
      this.loadCategories();
    });
  }

  ngOnInit() {
  }

  loadCategories() {
    this.categories = this.navService.getCategoryList();
  }
}
