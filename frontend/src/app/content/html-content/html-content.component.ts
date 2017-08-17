import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log("AAAA");
  }

  ngOnInit() {
  }

}
