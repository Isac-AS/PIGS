import { Component, Input } from '@angular/core';
import { Dish } from 'src/app/models/stock.model';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent {

  @Input() selectedDish!: Dish;

  constructor() { }
}
