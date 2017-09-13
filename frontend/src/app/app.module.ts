import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes,
}   from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HtmlContentComponent } from './html-content/html-content.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListItemComponent } from './blog-list-item/blog-list-item.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { BlogListPageComponent } from './blog-list-page/blog-list-page.component';
import { PageComponent } from './page/page.component';

import { NavService } from './services/nav.service';
import { MockHttpModule } from './mock-http/mock-http.module';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '', redirectTo: 'page/', pathMatch: 'full'
  },
  {
    path: 'page', redirectTo: 'page/', pathMatch: 'full'
  },
  {
    path: 'blog',
    component: BlogListPageComponent
  },
  {
    path: 'blog/:slug',
    component: BlogComponent
  },
  {
    path: 'page/:slug',
    component: PageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HtmlContentComponent,
    PageComponent,
    BlogComponent,
    BlogListItemComponent,
    BlogListPageComponent,
    BlogListComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    environment.production ? HttpModule : MockHttpModule,
    RouterModule.forRoot(
      routes,
      //{ enableTracing: true }
    ),
    NgbModule.forRoot(),
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
