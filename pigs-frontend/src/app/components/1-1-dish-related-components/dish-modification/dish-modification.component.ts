import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Dish, DishIngredient } from 'src/app/models/stock.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dish-modification',
  templateUrl: './dish-modification.component.html',
  styleUrls: ['./dish-modification.component.scss']
})
export class DishModificationComponent implements OnChanges, DoCheck {

  @Input() selectedDish!: Dish;
  @Output() selectedDishEmitter: any = new EventEmitter<any>();

  selectedIngredients: DishIngredient[] = [];

  selectedDishIngredient: DishIngredient;

  cleanDishIngredient: DishIngredient = {
    amount: 0,
    ingredient: { id: "", maxThreshold: 0, minThreshold: 0, name: "", path: "ingredients", quantity: 0 }
  }

  nameForm = this.fb.group({
    name: ["", Validators.required],
    price: [0, [ Validators.required, Validators.min(0)]]
  })

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) {
    this.selectedDishIngredient = this.cleanDishIngredient;
  }

  ngDoCheck(): void {
    if (this.selectedDish && this.selectedDish.ingredients.length != this.selectedIngredients.length) {
      console.log("[DEBUG] - [DISH MODIFICATION COMPONENT] - Do Check detected changes in ingredient array:")
      console.log("Selected Dish", this.selectedDish)
      console.log("Selected Dish Ingredients", this.selectedDish.ingredients)
      console.log("Selected Ingredients", this.selectedIngredients)
      this.selectedIngredients = [...this.selectedDish.ingredients];
      this.nameForm.setValue({
        name: this.selectedDish.name,
        price: this.selectedDish.price
      })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("[DEBUG] - [DISH MODIFICATION COMPONENT] - Changes:")
    console.log(changes)
    let updatedDish: Dish = changes['selectedDish'].currentValue;
    this.selectedDish = updatedDish;
  }

  // View Dish Ingredient Emitters
  saveDishIngredient(dishIngredient: DishIngredient) {
    // Remove dishIngredient
    this.selectedDish.ingredients = this.selectedDish.ingredients.filter(ingredient => ingredient.ingredient.id != dishIngredient.ingredient.id);
    this.selectedDish.ingredients.push(dishIngredient);
    this.emitSelectedDish();
    this.clearSelectedDishIngredient();
  }

  // Dish Ingredient Table Emitters
  updateSelectedDishIngredient(dishIngredient: DishIngredient) {
    this.selectedDishIngredient = dishIngredient;
  }

  removeSelectedDishIngredient(dishIngredient: DishIngredient) {
    // Remove dishIngredient
    console.log("[DEBUG] - [DISH MODIFICATION COMPONENT] - Removing dish:")
    this.selectedDish.ingredients = this.selectedDish.ingredients.filter(ingredient => ingredient.ingredient.id != dishIngredient.ingredient.id);
    //this.selectedIngredients = [...this.selectedDish.ingredients];
    this.emitSelectedDish();
    this.clearSelectedDishIngredient();
  }

  clearSelectedDishIngredient() {
    this.selectedDishIngredient = this.cleanDishIngredient;
  }

  update() {
    this.selectedDish.name = this.nameForm.value.name!;
    this.selectedDish.price = this.nameForm.value.price!;
    this.emitSelectedDish();
    this._snackBar.open("Saved!", "Continue", { duration: 5000 });
  }

  emitSelectedDish() {
    this.selectedDishEmitter.emit(this.selectedDish);
  }
}
