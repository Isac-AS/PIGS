import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/stock.model';

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent {

  @Input() selectedIngredient!: Ingredient;

  constructor() { }
}
