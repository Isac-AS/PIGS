import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-dish-page',
  templateUrl: './add-dish-page.component.html',
  styleUrls: ['./add-dish-page.component.scss']
})
export class AddDishPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Dish'
    })
   }
}
