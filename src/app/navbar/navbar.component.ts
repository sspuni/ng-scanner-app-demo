import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isNavBarOpen: Boolean = false;
  
  constructor() { }
  
  ngOnInit() {
  }

  toggleNavBar(){
    this.isNavBarOpen = !this.isNavBarOpen;
  }

}
