import { ManageWorkerService, Product } from '@/feature/manage/service/manage-worker.service';
import { SHARED_PRIMENG } from '@/shared/shared-primeng';
import { Component } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';


interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-daily-plan',
  imports: [SHARED_PRIMENG],
  templateUrl: './daily-plan.html',
  styleUrl: './daily-plan.scss',
  providers: [ManageWorkerService]
})
export class DailyPlan {
  products: Product[] = [];

  expandedRows: expandedRows = {};

  isExpanded: boolean = false;

  constructor(
    // private customerService: CustomerService,
    private productService: ManageWorkerService
  ) { }

  ngOnInit() {
    this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));

  }

  expandAll() {
    if (ObjectUtils.isEmpty(this.expandedRows)) {
      this.expandedRows = this.products.reduce(
        (acc, p) => {
          if (p.id) {
            acc[p.id] = true;
          }
          return acc;
        },
        {} as { [key: string]: boolean }
      );
      this.isExpanded = true;
    } else {
      this.collapseAll()
    }

  }

  collapseAll() {
    this.expandedRows = {};
    this.isExpanded = false;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'qualified':
      case 'instock':
      case 'INSTOCK':
      case 'DELIVERED':
      case 'delivered':
        return 'success';

      case 'negotiation':
      case 'lowstock':
      case 'LOWSTOCK':
      case 'PENDING':
      case 'pending':
        return 'warn';

      case 'unqualified':
      case 'outofstock':
      case 'OUTOFSTOCK':
      case 'CANCELLED':
      case 'cancelled':
        return 'danger';

      default:
        return 'info';
    }
  }
}
