import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// PrimeNG modules
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ButonDemo } from '../buton-demo/buton-demo';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MenubarModule,PanelMenuModule,ButtonModule,ButonDemo,DrawerModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
protected readonly title = signal('wms-primeng');
  drawerVisible = false;

  // 🔹 Define Main Modules for Top Menu
  topMenuItems: MenuItem[] = [
    { label: 'Sales', icon: 'pi pi-shopping-cart', command: () => this.loadModule('sales') },
    { label: 'Inventory', icon: 'pi pi-box', command: () => this.loadModule('inventory') },
    { label: 'HR', icon: 'pi pi-users', command: () => this.loadModule('hr') },
    { label: 'Reports', icon: 'pi pi-chart-line', command: () => this.loadModule('reports') }
  ];

  // 🔹 Store function menus of current module
  leftMenuItems: MenuItem[] = [];

  // 🔹 Function menus grouped by module
  moduleMenus: Record<string, MenuItem[]> = {
    sales: [
      { label: 'Orders', icon: 'pi pi-list', routerLink: '/sales/orders' },
      { label: 'Customers', icon: 'pi pi-user', routerLink: '/sales/customers' },
      { label: 'Invoices', icon: 'pi pi-file', routerLink: '/sales/invoices' }
    ],
    inventory: [
      { label: 'Products', icon: 'pi pi-box', routerLink: '/inventory/product' },
      { label: 'Stock Levels', icon: 'pi pi-database', routerLink: '/inventory/stock' },
      { label: 'Suppliers', icon: 'pi pi-truck', routerLink: '/inventory/suppliers' }
    ],
    hr: [
      { label: 'Employees', icon: 'pi pi-users', routerLink: '/hr/employees' },
      { label: 'Payroll', icon: 'pi pi-wallet', routerLink: '/hr/payroll' },
      { label: 'Leave Requests', icon: 'pi pi-calendar', routerLink: '/hr/leave' }
    ],
    reports: [
      { label: 'Sales Report', icon: 'pi pi-chart-bar', routerLink: '/reports/sales' },
      { label: 'Inventory Report', icon: 'pi pi-chart-pie', routerLink: '/reports/inventory' },
      { label: 'HR Report', icon: 'pi pi-chart-line', routerLink: '/reports/hr' }
    ]
  };

  // 🔹 Switch module and update left menu
  loadModule(module: string) {
    this.leftMenuItems = this.moduleMenus[module] || [];
    this.drawerVisible = true; // Open drawer automatically for mobile
  }
}
