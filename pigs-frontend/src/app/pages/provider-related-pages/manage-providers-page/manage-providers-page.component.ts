import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-providers-page',
  templateUrl: './manage-providers-page.component.html',
  styleUrls: ['./manage-providers-page.component.scss']
})
export class ManageProvidersPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Providers'
    })
   }
}
