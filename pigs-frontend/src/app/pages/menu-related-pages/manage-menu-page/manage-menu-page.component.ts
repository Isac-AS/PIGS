import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-menu-page',
  templateUrl: './manage-menu-page.component.html',
  styleUrls: ['./manage-menu-page.component.scss']
})
export class ManageMenuPageComponent {

  selectedMenu: Menu = {
    name: "",
    dishes: [],
    price: 0,
    path: "menus",
    id: ""
  }

  constructor(
    public globalService: GlobalService,
    private _snackBar: MatSnackBar,
    private db: DatabaseService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Menus'
    })
  }

  updateSelectedMenu(newMenu: Menu) {
    this.selectedMenu = newMenu;
  }

  updateMenu() {
    let promise = this.db.updateDocument(this.selectedMenu, this.selectedMenu.path, this.selectedMenu.id);
    promise.then((_) => {
      this._snackBar.open("Menu updated successfully!", "Continue", { duration: 5000 });
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during menu updating process, try later.", "Continue", { duration: 5000 });
    })
  }
}
