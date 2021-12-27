import {Component, OnInit} from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard',
    title: 'Passwords',
    rtlTitle: 'Passwords',
    icon: 'icon-chart-pie-36',
    class: ''
  },
  {
    path: '/passwords-share-settings',
    title: 'Share settings',
    rtlTitle: 'Share settings',
    icon: 'icon-chart-pie-36',
    class: ''
  },
  {
    path: '/logs',
    title: 'Logs',
    rtlTitle: 'Logs',
    icon: 'icon-chart-pie-35',
    class: ''
  },
  {
    path: '/login-settings',
    title: 'Login settings',
    rtlTitle: 'Login settings',
    icon: 'icon-chart-pie-34',
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
