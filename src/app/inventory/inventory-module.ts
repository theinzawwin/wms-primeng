import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Product } from './product/product';
import { Stock } from './stock/stock';

const routes: Routes = [
            {
              path: 'product',
              component: Product
            },
            {
              path: 'stock',
              component: Stock
            }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class InventoryModule { }
