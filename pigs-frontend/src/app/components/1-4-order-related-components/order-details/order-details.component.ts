import { Component, Input } from '@angular/core';
import { Menu } from 'src/app/models/stock.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  @Input() selectedMenu!: Menu;

  constructor() { }
}
