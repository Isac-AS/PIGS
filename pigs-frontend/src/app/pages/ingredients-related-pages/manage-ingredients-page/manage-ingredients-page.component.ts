import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/stock.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-ingredients-page',
  templateUrl: './manage-ingredients-page.component.html',
  styleUrls: ['./manage-ingredients-page.component.scss']
})
export class ManageIngredientsPageComponent {

  selectedIngredient: Ingredient = {
    name: "",
    quantity: 0,
    minThreshold: 0,
    maxThreshold: 0,
    path: "ingredients",
    id: ""
  }

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Ingredients'
    })
  }

  updateSelectedIngredient(user: Ingredient) {
    this.selectedIngredient = user;
  }
}
