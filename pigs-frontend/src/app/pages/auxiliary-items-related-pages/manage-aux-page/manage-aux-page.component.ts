import { Component, OnInit } from '@angular/core';
import { AuxItem } from 'src/app/models/stock.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-aux-page',
  templateUrl: './manage-aux-page.component.html',
  styleUrls: ['./manage-aux-page.component.scss']
})
export class ManageAuxPageComponent {

  selectedAuxItem: AuxItem = {
    name: "",
    quantity: 0,
    minThreshold: 0,
    maxThreshold: 0,
    path: "auxItems",
    id: ""
  }

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Auxiliary Items'
    })
  }

  updateSelectedAuxItem(user: AuxItem) {
    this.selectedAuxItem = user;
  }
}
