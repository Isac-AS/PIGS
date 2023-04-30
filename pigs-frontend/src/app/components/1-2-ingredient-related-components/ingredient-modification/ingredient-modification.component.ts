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


  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) { }

  async submit() {

    //this.db.updateDocument(this.selectedUser, "users", this.selectedUser.id)
    this._snackBar.open("¡User modified successfully!", "Continue", { duration: 5000 });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios en ventana")
    console.log(changes)
    let updatedIngredient: Ingredient = changes['selectedIngredient'].currentValue;
  }
}
