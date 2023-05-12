import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dish, Menu } from 'src/app/models/stock.model';

@Component({
  selector: 'app-menu-dish-list',
  templateUrl: './menu-dish-list.component.html',
  styleUrls: ['./menu-dish-list.component.scss']
})
export class MenuDishListComponent {

  @Input() selectedMenu!: Menu;
  @Output() selectedDishEmitter: any = new EventEmitter<any>();
  
  constructor() { }

  emitDishForDeletion(dish: Dish){
    this.selectedDishEmitter.emit(dish)
  }



}
