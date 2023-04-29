import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-dishes-page',
  templateUrl: './manage-dishes-page.component.html',
  styleUrls: ['./manage-dishes-page.component.scss']
})
export class ManageDishesPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Dishes'
    })
   }
}
