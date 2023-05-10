import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Dish, DishIngredient, Ingredient } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-dish-page',
  templateUrl: './add-dish-page.component.html',
  styleUrls: ['./add-dish-page.component.scss']
})
export class AddDishPageComponent {

  selectedDishIngredient: DishIngredient;

  cleanDishIngredient: DishIngredient = {
    amount: 0,
    ingredient: { id: "", maxThreshold: 0, minThreshold: 0, name: "", path: "ingredients", quantity: 0 }
  }

  currentDish: Dish = {
    id: "",
    ingredients: [],
    name: "",
    path: 'dishes'
  }

  constructor(
    public globalService: GlobalService,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Dish'
    })
    this.selectedDishIngredient = this.cleanDishIngredient;
    this.currentDish.id = this.db.createId();
  }

  addNewIngredient(ingredient: Ingredient) {
    this.selectedDishIngredient = {
      amount: 0,
      ingredient: ingredient
    }
  }

  clearSelectedDishIngredient() {
    this.selectedDishIngredient = this.cleanDishIngredient;
  }

  addDishIngredient(dishIngredient: DishIngredient) {
    let ingredients = this.currentDish.ingredients.filter(ingredient => ingredient.ingredient.id == dishIngredient.ingredient.id);
    if (ingredients.length == 0) {
      this.currentDish.ingredients.push(dishIngredient);
    } else {
      console.log("ATTEMPTING TO ADD AN ALREADY EXISTING INGREDIENT")
    }
    this.clearSelectedDishIngredient();
    console.log("[DEBUG] - [ADD DISH PAGE] - Adding ingredient:")
    console.log(this.currentDish)
  }

  updateCurrentDish(updatedDish: Dish){
    this.currentDish = updatedDish;
    console.log("[DEBUG] - [ADD DISH PAGE] - Updated current Dish:")
    console.log(this.currentDish)
  }

  saveDish() {
    let promise = this.db.createDocument(this.currentDish, this.currentDish.path, this.currentDish.id);
    promise.then((_) => {
      this._snackBar.open("Dish added successfully!", "Continue", { duration: 5000 });
      this.router.navigate(['/manage_dishes'])
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during dish addition, try later.", "Continue", { duration: 5000 });
    })
  }
}
