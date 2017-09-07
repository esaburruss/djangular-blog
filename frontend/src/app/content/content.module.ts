import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes,
}   from '@angular/router';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HtmlContentComponent } from './html-content/html-content.component';
import { ContentComponent } from './content.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListItemComponent } from './blog-list-item/blog-list-item.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { BlogListPageComponent } from './blog-list-page/blog-list-page.component';
import { PageComponent } from './page/page.component';

import { NavService } from '../services/nav.service';

export const routes: Routes = [
  {
    path: '', redirectTo: 'page/', pathMatch: 'full'
    //outlet: 'content',
  },
  {
    path: 'page', redirectTo: 'page/', pathMatch: 'full'
  },
  {
    path: 'blog',
    component: BlogListPageComponent,
    //outlet: 'content',
  },
  {
    path: 'blog/:slug',
    component: BlogComponent,
    //outlet: 'content',
  },
  {
    path: 'page/:slug',
    component: PageComponent,
    //outlet: 'content',
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    ContentComponent,
    HtmlContentComponent,
    PageComponent,
    BlogComponent,
    BlogListItemComponent,
    BlogListPageComponent,
    BlogListComponent,
    CategoryListComponent,
  ],
  providers: [
    NavService
  ],
  bootstrap: [
    ContentComponent
  ],
})
export class ContentModule {

}
