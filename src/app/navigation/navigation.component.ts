import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public isNavBarClicked = false;
  public showHideNavigation = new Subject<boolean>();
  public showHideNavObs$ = this.showHideNavigation.asObservable();

  public routeConfig = [
    {
      path: '',
      display: 'Home'
    },
    {
      path: '/tasks',
      display: 'Tasks'
    },
    {
      path: '/users',
      display: 'Users'
    },
    {
      path: '/inventory',
      display: 'Inventory'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onNavBarClick(): void {
    this.showHideNavigation.next(!this.isNavBarClicked);
    this.isNavBarClicked = !this.isNavBarClicked;
  }

  onNavItemClick(): void {
    this.isNavBarClicked = false;
    this.showHideNavigation.next(this.isNavBarClicked);
  }

}
