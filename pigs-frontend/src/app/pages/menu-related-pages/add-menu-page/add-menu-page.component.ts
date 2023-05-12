import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Dish, Menu } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-menu-page',
  templateUrl: './add-menu-page.component.html',
  styleUrls: ['./add-menu-page.component.scss']
})
export class AddMenuPageComponent {

  selectedMenu: Menu = {
    dishes: [],
    id: "",
    name: "",
    path: 'menus'
  }

  constructor(
    public globalService: GlobalService,
    private db: DatabaseService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Menu'
    })
    this.selectedMenu.id = this.db.createId();
  }


  saveMenu() {
    let promise = this.db.createDocument(this.selectedMenu, this.selectedMenu.path, this.selectedMenu.id);
    promise.then((_) => {
      this._snackBar.open("Menu added successfully!", "Continue", { duration: 5000 });
      this.router.navigate(['/manage_menus'])
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during Menu addition, try later.", "Continue", { duration: 5000 });
    })
  }

  updateSelectedMenu(newMenu: Menu) {
    this.selectedMenu = newMenu;
  }


}
