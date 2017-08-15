import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageComponent } from './page/page.component';
import { NavbarModule } from './navbar/navbar.module';
import { BlogComponent } from './blog/blog.component';
import { BlogListItemComponent } from './blog-list-item/blog-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    PageComponent,
    BlogComponent,
    BlogListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavbarModule,
    RouterModule.forRoot([
      {
        path: '',
        component: PageComponent
      },
      {
        path: 'page/:nav_url',
        component: PageComponent
      },
      {
        path: 'blog/:slug',
        component: BlogComponent
      }
    ]),
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
