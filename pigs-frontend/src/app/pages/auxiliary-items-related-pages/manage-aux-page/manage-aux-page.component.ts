import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-aux-page',
  templateUrl: './manage-aux-page.component.html',
  styleUrls: ['./manage-aux-page.component.scss']
})
export class ManageAuxPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Auxiliary Items'
    })
   }
}
