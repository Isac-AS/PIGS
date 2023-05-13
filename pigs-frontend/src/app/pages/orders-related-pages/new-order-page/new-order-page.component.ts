import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Dish, Menu, Order } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-new-order-page',
  templateUrl: './new-order-page.component.html',
  styleUrls: ['./new-order-page.component.scss']
})
export class NewOrderPageComponent {

  selectedOrder: Order = {
    dishes: [],
    menus: [],
    price: 0,
    path: 'orders',
    id: ""
  }

  constructor(
    public globalService: GlobalService,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Order'
    })
    this.selectedOrder.id = this.db.createId();
  }


  saveMenu() {
    let promise = this.db.createDocument(this.selectedOrder, this.selectedOrder.path, this.selectedOrder.id);
    promise.then((_) => {
      this._snackBar.open("Order created successfully!", "Continue", { duration: 5000 });
      this.router.navigate(['/pending_orders'])
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during Order creation, try later.", "Continue", { duration: 5000 });
    })
  }

  updateSelectedOrder(newOrder: Order) {
    this.selectedOrder = newOrder;
  }


}
