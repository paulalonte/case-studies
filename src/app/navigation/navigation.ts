export const ROUTECONFIG: IRouteConfig[] = [
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
      path: '/assignments',
      display: 'Assignments'
    },
    {
      path: '/inventory',
      display: 'Inventory'
    }
];

export interface IRouteConfig {
    display: string;
    path: string;
}
