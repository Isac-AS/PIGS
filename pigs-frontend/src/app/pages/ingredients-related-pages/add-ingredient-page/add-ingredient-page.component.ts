import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-ingredient-page',
  templateUrl: './add-ingredient-page.component.html',
  styleUrls: ['./add-ingredient-page.component.scss']
})
export class AddIngredientPageComponent {

  ingredientForm = this.fb.group({
    name: ["", Validators.required],
    quantity: [null, Validators.required],
    minThreshold: [null, Validators.required],
    maxThreshold: [null, Validators.required],
  })

  ingredient: Ingredient = {
    name: "",
    quantity: 0,
    maxThreshold: 0,
    minThreshold: 0,
    path: "ingredients",
    id: ""
  }

  constructor(
    public globalService: GlobalService,
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Ingredient'
    })
  }

  submit() {
    this.ingredient.name = this.ingredientForm.value.name!;
    this.ingredient.quantity = this.ingredientForm.value.quantity!;
    this.ingredient.minThreshold = this.ingredientForm.value.minThreshold!;
    this.ingredient.maxThreshold = this.ingredientForm.value.maxThreshold!;
    this.ingredient.id = this.db.createId()

    let promise = this.db.createDocument(this.ingredient, this.ingredient.path, this.ingredient.id);
    promise.then((_) => {
      this._snackBar.open("Ingredient added successfully!", "Continue", { duration: 5000 });
      this.clearForm();
    }).catch(error => {
      this._snackBar.open("Error during ingredient addition, try later.", "Continue", { duration: 5000 });
    })
  }

  clearForm() {
    this.ingredientForm.reset();
    this.ingredientForm.controls['name'].markAsUntouched();
  }
}
