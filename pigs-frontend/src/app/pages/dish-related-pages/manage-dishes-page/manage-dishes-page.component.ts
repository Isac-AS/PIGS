import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/stock.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-dishes-page',
  templateUrl: './manage-dishes-page.component.html',
  styleUrls: ['./manage-dishes-page.component.scss']
})
export class ManageDishesPageComponent {

  selectedDish: Dish = {
    name: "",
    ingredients: [],
    path: "dishes"
  }

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Dishes'
    })
  }

  updateSelectedDish(user: Dish) {
    this.selectedDish = user;
  }
}
