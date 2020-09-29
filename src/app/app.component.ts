import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routing-app';

  public routeConfig = [
    {
      path: '',
      display: 'Home'
    },
    {
      path: '/todos',
      display: 'Todo'
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
}

