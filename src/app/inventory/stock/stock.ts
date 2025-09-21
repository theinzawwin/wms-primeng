import { Component, inject, signal } from '@angular/core';
import { ProductModel } from '../../core/models/product.model';
import { ProductService } from '../../core/product-service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StockService } from '../../core/stock-service';
@Component({
  selector: 'app-stock',
  imports: [InputTextModule,SelectModule,ButtonModule,CardModule,
    ReactiveFormsModule

  ],
  templateUrl: './stock.html',
  styleUrl: './stock.scss'
})
export class Stock  {

  stockService = inject(StockService);

  productList = signal<ProductModel[]>([]);
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  stockForm!: FormGroup;
  loading=signal<boolean>(true);
  constructor(){

  }
 ngOnInit(): void {
 this.stockForm = this.fb.group({
  productId: ['', [Validators.required]],
  quantity: ['', [Validators.required, Validators.min(1)]],
  price: ['', [Validators.required, Validators.min(1)]],
  uom: ['', [Validators.required]]
});
  this.productService.getProducts().subscribe({
      next: (data:ProductModel[]) => {
        console.log('Product List fetched successfully', data);
        this.productList.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching products', err);
        this.loading.set(false);
      }
    })
 }
  onSubmit(): void {
    if (this.stockForm.valid) {
      const payload = {
      ...this.stockForm.value,
      productId: this.stockForm.value.productId?.productId // extract ID only
    };
      this.loading.set(true);
      console.log('Product Data:',payload);
      this.stockService.saveStock(payload).subscribe({
        next:(data:any)=>{
            console.log("Stock data is saved successfully!");
        },
        error:(err) => {
        console.error('Error fetching products', err);
        this.loading.set(false);
      }
      });
      // TODO: call API to save product
    } else {
      this.stockForm.markAllAsTouched();
    }
  }


}
