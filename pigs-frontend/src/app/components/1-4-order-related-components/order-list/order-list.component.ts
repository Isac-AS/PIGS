import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Dish, Menu, Order } from 'src/app/models/stock.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  @Input() selectedOrder!: Order;
  @Output() selectedOrderEmitter: any = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
