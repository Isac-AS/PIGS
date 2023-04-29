import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-aux-page',
  templateUrl: './add-aux-page.component.html',
  styleUrls: ['./add-aux-page.component.scss']
})
export class AddAuxPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Auxiliary Item'
    })
   }
}
