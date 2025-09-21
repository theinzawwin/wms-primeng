import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { App } from './app';
import { Login } from './login/login';
import { Home } from './home/home';
import { Layout } from './layout/layout';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', component: Home },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales-module').then(m => m.SalesModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./inventory/inventory-module').then(m=>m.InventoryModule)
      }
    ]
  },
    // {
    //     path: 'sales',
    //     loadChildren: () => import('./sales/sales-module').then(m => m.SalesModule)
    // }
];
