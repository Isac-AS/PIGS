import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/services/global.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Dish, Menu } from 'src/app/models/stock.model';

@Component({
  selector: 'app-menu-modification',
  templateUrl: './menu-modification.component.html',
  styleUrls: ['./menu-modification.component.scss']
})
export class MenuModificationComponent {

  @Input() selectedMenu!: Menu;
  @Output() selectedMenuEmitter: any = new EventEmitter<any>();

  nameForm = this.fb.group({
    name: ["", Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private db: DatabaseService,
    public globalService: GlobalService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambios en ventana")
    console.log(changes)
    let updatedMenu: Menu = changes['selectedMenu'].currentValue;
    this.selectedMenu = updatedMenu;
    this.nameForm.setValue({
      name: updatedMenu.name
    })
  }

  
  addDishToMenu(newDish: Dish) {
    this.selectedMenu.dishes.push(newDish);
    this.emitSelectedMenu();
  }

  updateName() {
    this.selectedMenu.name = this.nameForm.value.name!;
    this.emitSelectedMenu();
  }

  removeDishFromMenu(dishToRemove: Dish) {
    this.selectedMenu.dishes = this.selectedMenu.dishes.filter(dish => dish.id != dishToRemove.id);
    this.emitSelectedMenu()
  }

  emitSelectedMenu() {
    this.selectedMenuEmitter.emit(this.selectedMenu)
  }


  
}
