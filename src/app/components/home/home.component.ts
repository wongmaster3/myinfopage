import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Utils } from '../../shared/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
footerAtEndPlacement = false;
loading = true;

@HostListener('window:resize', ['$event'])
onResize() {
  if (window.innerWidth > 980) {
    this.footerAtEndPlacement = false;
  } else {
    this.footerAtEndPlacement = true; 
  }
}

  constructor() {}

  ngOnInit() {
    if (window.innerWidth > 980) {
      this.footerAtEndPlacement = false;
    } else {
      this.footerAtEndPlacement = true; 
    }
    this.loading = false;
  }

  goToUrl(url: string) {
    Utils.goToUrl(url);
  }

}
