import { Component } from '@angular/core';
import { ManageWorkerService, Product } from '../service/manage-worker.service';
import { SHARED_PRIMENG } from '@/shared/shared-primeng';


@Component({
  selector: 'app-manage-worker',
  imports: [SHARED_PRIMENG],
  templateUrl: './manage-worker.html',
  styleUrl: './manage-worker.scss',
  providers: [ManageWorkerService],
})
export class ManageWorker {
  layout: 'list' | 'grid' = 'list';

  options = ['list', 'grid'];

  products: Product[] = [];

  product!: Product;
  productDialog: boolean = false;
  submitted: boolean = false;

  statuses!: any[];

  constructor(private manageWorkerService: ManageWorkerService) { }

  ngOnInit() {
    this.manageWorkerService.getProductsSmall().then((data) => (this.products = data.slice(0, 6)));

    this.loadDemoData();
  }

  loadDemoData() {
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }


  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warn';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return 'info';
    }
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    // this.submitted = true;
    // let _products = this.products();
    // if (this.product.name?.trim()) {
    //   if (this.product.id) {
    //     _products[this.findIndexById(this.product.id)] = this.product;
    //     this.products.set([..._products]);
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Updated',
    //       life: 3000
    //     });
    //   } else {
    //     this.product.id = this.createId();
    //     this.product.image = 'product-placeholder.svg';
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Successful',
    //       detail: 'Product Created',
    //       life: 3000
    //     });
    //     this.products.set([..._products, this.product]);
    //   }

    //   this.productDialog = false;
    //   this.product = {};
    // }
  }
}
