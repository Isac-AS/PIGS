import { Component } from '@angular/core';
import { Dish, Menu } from 'src/app/models/stock.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  dishList: Dish[] = [];
  menuList: Menu[] = [];

  constructor(
    private database: DatabaseService,
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Restaurant Menu',
    });
    this.getDishs();
    this.getMenus();
  }

  getDishs() {
    this.database.readCollection<Dish>('dishes').subscribe({
      next: (dishs) => {
        console.log('[DEBUG] - Dishes collection');
        console.log(dishs);
        this.dishList = dishs;
      },
    });
  }

  getMenus() {
    this.database.readCollection<Menu>('menus').subscribe({
      next: (menus) => {
        console.log('[DEBUG] - Menus collection');
        console.log(menus);
        this.menuList = menus;
      },
    });
  }

  displayedIngredientsColumns: string[] = ['name', 'amount'];
  displayedDishesColumns: string[] = ['name', 'price', 'ingredients'];
}
