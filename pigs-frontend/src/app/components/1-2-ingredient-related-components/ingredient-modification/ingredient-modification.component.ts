import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Ingredient } from 'src/app/models/stock.model';

@Component({
  selector: 'app-ingredient-modification',
  templateUrl: './ingredient-modification.component.html',
  styleUrls: ['./ingredient-modification.component.scss']
})
export class IngredientModificationComponent {

  @Input() selectedIngredient!: Ingredient;

  ingredientForm = this.fb.group({
    name: ["", Validators.required],
    quantity: [0, Validators.required],
    minThreshold: [0, Validators.required],
    maxThreshold: [0, Validators.required],
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
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) { }

  async submit() {
    this.ingredient.name = this.ingredientForm.value.name!;
    this.ingredient.quantity = this.ingredientForm.value.quantity!;
    this.ingredient.minThreshold = this.ingredientForm.value.minThreshold!;
    this.ingredient.maxThreshold = this.ingredientForm.value.maxThreshold!;

    let promise = this.db.updateDocument(this.ingredient, this.ingredient.path, this.ingredient.id);
    promise.then((_) => {
      this._snackBar.open("Ingredient modified successfully!", "Continue", { duration: 5000 });
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during ingredient modification, try later.", "Continue", { duration: 5000 });
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    let updatedIngredient: Ingredient = changes['selectedIngredient'].currentValue;
    this.ingredient = updatedIngredient;
    if (updatedIngredient) {
      this.ingredientForm.setValue({
        name: updatedIngredient.name,
        quantity: updatedIngredient.quantity,
        minThreshold: updatedIngredient.minThreshold,
        maxThreshold: updatedIngredient.maxThreshold,
      })
    }
  }
}
