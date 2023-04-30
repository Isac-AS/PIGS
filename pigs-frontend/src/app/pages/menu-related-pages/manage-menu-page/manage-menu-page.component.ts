import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/stock.model';
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
    path: "menus"
  }

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Menus'
    })
  }

  updateSelectedMenu(user: Menu) {
    this.selectedMenu = user;
  }
}
