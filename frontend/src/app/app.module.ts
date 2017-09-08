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
import { NavService } from './services/nav.service';
import {MockHttpModule} from './mock-http/mock-http.module';
import {environment} from '../environments/environment';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    environment.production ? HttpModule : MockHttpModule,
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
