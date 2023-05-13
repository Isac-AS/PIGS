import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Dish, Menu, Order } from 'src/app/models/stock.model';

@Component({
  selector: 'app-order-modification',
  templateUrl: './order-modification.component.html',
  styleUrls: ['./order-modification.component.scss']
})
export class OrderModificationComponent {

  private suggested_amount: number = 0;

  @Input() selectedOrder!: Order;
  @Output() selectedOrderEmitter: any = new EventEmitter<any>();

  priceForm = this.fb.group({
    price: [{value: this.suggested_amount, disabled: true}, [Validators.required, Validators.min(0)]]
  })

  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios en ventana")
    console.log(changes)
    let updatedOrder: Order = changes['selectedOrder'].currentValue;
    this.selectedOrder = updatedOrder;
    this.priceForm.setValue({
      price: this.selectedOrder.price
    })
  }

  updatePrice(){
    this.priceForm.setValue({
      price: parseFloat(this.suggested_amount.toFixed(2)) 
    })
    this.selectedOrder.price = this.priceForm.value.price!;
  }

  addDishToOrder(newDish: Dish) {
    this.selectedOrder.dishes.push(newDish);
    this.suggested_amount += parseFloat(newDish.price.toFixed(2));
    this.updatePrice();
    this.emitSelectedOrder();
  }

  addMenuToOrder(newMenu: Menu) {
    this.selectedOrder.menus.push(newMenu);
    this.suggested_amount += parseFloat(newMenu.price.toFixed(2));
    this.updatePrice();
    this.emitSelectedOrder();
  }

  removeDishFromOrder(dishToRemove: any) {
    console.log("removeDishFromOrder");
    console.log(dishToRemove);
    const index = this.selectedOrder.dishes.findIndex(dish => dish.id === dishToRemove.id);
    if (index !== -1) {
      this.selectedOrder.dishes.splice(index, 1)[0];
      this._snackBar.open("Deleted!", "Continue", { duration: 2000 });
    } else {
      console.log('Object not found.');
    }
    this.suggested_amount -= parseFloat(dishToRemove.price.toFixed(2));
    this.updatePrice();
    this.emitSelectedOrder();
  }

  removeMenuFromOrder(menuToRemove: any) {
    console.log("removeMenuFromOrder");
    console.log(menuToRemove);
    const index = this.selectedOrder.menus.findIndex(menu => menu.id === menuToRemove.id);
    if (index !== -1) {
      this.selectedOrder.menus.splice(index, 1)[0];
      this._snackBar.open("Deleted!", "Continue", { duration: 2000 });
    } else {
      console.log('Object not found.');
    }
    this.suggested_amount -= parseFloat(menuToRemove.price.toFixed(2));
    this.updatePrice();
    this.emitSelectedOrder()
  }

  emitSelectedOrder() {
    this.selectedOrderEmitter.emit(this.selectedOrder)
  }

}
