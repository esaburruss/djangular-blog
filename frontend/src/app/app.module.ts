import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes
}   from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import {
  routes as contentRoutes,
  ContentModule
} from './content/content.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavService } from './services/nav.service';

const routes: Routes = [
  //{ path: '', redirectTo: 'content', pathMatch: 'full' },
  {
    path: '',
    component: ContentComponent,
    children: contentRoutes
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      routes,
      //{ enableTracing: true }
    ),
    NgbModule.forRoot(),
    ContentModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
