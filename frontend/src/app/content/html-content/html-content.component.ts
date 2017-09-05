import { Component, OnInit } from '@angular/core';

import { NavService } from '../../services/nav.service';

import { Content } from '../../models/content.model';
import { Page } from '../../models/page.model';

@Component({
  selector: 'app-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent implements OnInit {
  content: Content;
  constructor(private navService: NavService) {
    this.content = new Content({'title': 'Loading', 'body': 'Loading'});//navService.getCurrentContent();
    navService.content$.subscribe(content => {
      this.content = content;
    });
  }

  ngOnInit() {
    this.content = this.navService.getCurrentContent();
  }
}
