import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Utils } from '../../shared/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

profileImage: string;
footerAtEndPlacement = false;
loading = true;
color = 'primary';
mode = 'determinate';
value = 50;

@HostListener('window:resize', ['$event'])
onResize(event) {
  if (window.innerWidth > 980) {
    this.footerAtEndPlacement = false;
  } else {
    this.footerAtEndPlacement = true; 
  }
}

  constructor() { 
    this.profileImage = 'assets/images/mattwong.jpg';
  }

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
