import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dish } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
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
    path: "dishes",
    id: ""
  }

  constructor(
    public globalService: GlobalService,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Dishes'
    })
  }

  updateSelectedDish(dish: Dish) {
    this.selectedDish = dish;
  }

  updateDish() {
    let promise = this.db.updateDocument(this.selectedDish, this.selectedDish.path, this.selectedDish.id);
    promise.then((_) => {
      this._snackBar.open("Dish updated successfully!", "Continue", { duration: 5000 });
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during dish updating process, try later.", "Continue", { duration: 5000 });
    })
  }
}
