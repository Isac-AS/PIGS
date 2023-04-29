import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-menu-page',
  templateUrl: './manage-menu-page.component.html',
  styleUrls: ['./manage-menu-page.component.scss']
})
export class ManageMenuPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Menus'
    })
   }
}
