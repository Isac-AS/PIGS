import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-ingredients-page',
  templateUrl: './manage-ingredients-page.component.html',
  styleUrls: ['./manage-ingredients-page.component.scss']
})
export class ManageIngredientsPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Ingredients'
    })
   }
}
