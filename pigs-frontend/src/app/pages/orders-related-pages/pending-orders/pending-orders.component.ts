import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent {

  selectedOrder: Order = {
    dishes: [],
    menus: [],
    price: 0,
    path: "orders",
    id: ""
  }

  constructor(
    public globalService: GlobalService,
    private _snackBar: MatSnackBar,
    private db: DatabaseService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Pending Orders'
    })
  }

  updateSelectedOrder(newOrder: Order) {
    this.selectedOrder = newOrder;
  }

  updateOrder() {
    let promise = this.db.updateDocument(this.selectedOrder, this.selectedOrder.path, this.selectedOrder.id);
    promise.then((_) => {
      this._snackBar.open("Order updated successfully!", "Continue", { duration: 5000 });
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during Order updating process, try later.", "Continue", { duration: 5000 });
    })
  }
}
