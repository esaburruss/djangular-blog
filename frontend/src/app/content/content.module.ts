import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContentComponent } from './content.component';
import { BlogComponent } from '../blog/blog.component';
import { BlogListItemComponent } from '../blog-list-item/blog-list-item.component';
import { PageComponent } from '../page/page.component';

import { NavService } from '../services/nav.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContentComponent,
        children: [

          {
            path: 'blog/:slug',
            component: BlogComponent,
            outlet: 'content',
          },
          {
            path: '',
            component: PageComponent,
            outlet: 'content',
          },
          {
            path: 'page/:nav_url',
            component: PageComponent,
            outlet: 'content',
          }
        ]
      },
    ]),
    NgbModule,
  ],
  declarations: [
    ContentComponent,
    PageComponent,
    BlogComponent,
    BlogListItemComponent,
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
