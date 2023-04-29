import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-menu-page',
  templateUrl: './add-menu-page.component.html',
  styleUrls: ['./add-menu-page.component.scss']
})
export class AddMenuPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Menu'
    })
   }
}
