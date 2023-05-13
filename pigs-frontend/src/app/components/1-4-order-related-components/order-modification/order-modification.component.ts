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

  @Input() selectedOrder!: Order;
  @Output() selectedOrderEmitter: any = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    public globalService: GlobalService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios en ventana")
    console.log(changes)
    let updatedOrder: Order = changes['selectedOrder'].currentValue;
    this.selectedOrder = updatedOrder;
  }

  addDishToOrder(newDish: Dish) {
    this.selectedOrder.dishes.push(newDish);
    this.emitSelectedOrder();
  }

  addMenuToOrder(newMenu: Menu) {
    this.selectedOrder.menus.push(newMenu);
    this.emitSelectedOrder();
  }

  removeDishFromOrder(dishToRemove: any) {
    this.selectedOrder.dishes = this.selectedOrder.dishes.filter(dish => dish.id != dishToRemove.id);
    this.emitSelectedOrder()
  }

  removeMenuFromOrder(menuToRemove: any) {
    this.selectedOrder.menus = this.selectedOrder.menus.filter(dish => dish.id != menuToRemove.id);
    this.emitSelectedOrder()
  }

  emitSelectedOrder() {
    this.selectedOrderEmitter.emit(this.selectedOrder)
  }

}
