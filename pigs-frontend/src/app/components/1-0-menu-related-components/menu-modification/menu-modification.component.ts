import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Dish, Menu } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-modification',
  templateUrl: './menu-modification.component.html',
  styleUrls: ['./menu-modification.component.scss']
})
export class MenuModificationComponent {

  private suggested_amount: number = 0;
  @Input() selectedMenu!: Menu;
  @Output() selectedMenuEmitter: any = new EventEmitter<any>();

  nameForm = this.fb.group({
    name: ["", Validators.required],
    price: [this.suggested_amount, [ Validators.required, Validators.min(0)]]
  })

  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    public globalService: GlobalService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios en ventana")
    console.log(changes)
    let updatedMenu: Menu = changes['selectedMenu'].currentValue;
    this.selectedMenu = updatedMenu;
    this.suggested_amount = this.selectedMenu.price;
    this.nameForm.setValue({
      name: updatedMenu.name,
      price: updatedMenu.price
    })
  }

  addDishToMenu(newDish: Dish) {
    this.selectedMenu.dishes.push(newDish);
    this.suggested_amount += parseFloat((newDish.price * 0.9).toFixed(2));
    this.updatePrice(true);
    this.emitSelectedMenu();
  }

  updatePrice(mul: Boolean){
    this.nameForm.setValue({
      name: this.selectedMenu.name,
      price: parseFloat(this.suggested_amount.toFixed(2)) 
    })
  }

  update() {
    this.selectedMenu.name = this.nameForm.value.name!;
    this.selectedMenu.price = this.nameForm.value.price!;
    this._snackBar.open("Saved!", "Continue", { duration: 5000 });
    this.emitSelectedMenu();
  }

  removeDishFromMenu(dishToRemove: Dish) {
    const index = this.selectedMenu.dishes.findIndex(dish => dish.id === dishToRemove.id);
    if (index !== -1) {
      this.selectedMenu.dishes.splice(index, 1)[0];
      this._snackBar.open("Deleted!", "Continue", { duration: 2000 });
    } else {
      console.log('Object not found.');
    }
    this.suggested_amount -= parseFloat((dishToRemove.price * 0.9).toFixed(2));
    this.updatePrice(false);
    this.emitSelectedMenu()
  }

  emitSelectedMenu() {
    this.selectedMenuEmitter.emit(this.selectedMenu)
  }
}
