import { Component, Input } from '@angular/core';
import { Order } from 'src/app/models/stock.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  @Input() selectedOrder!: Order;

  constructor() { }
}
