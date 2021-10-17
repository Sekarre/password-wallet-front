import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/login',
    title: 'Login',
    rtlTitle: 'Login',
    icon: 'icon-single-02',
    class: ''
  },
  {
    path: '/dashboard',
    title: 'Passwords',
    rtlTitle: 'Passwords',
    icon: 'icon-chart-pie-36',
    class: ''
  },
  {
    path: '/user',
    title: 'User Profile',
    rtlTitle: 'Profile',
    icon: 'icon-single-02',
    class: ''
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
