import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-provider-page',
  templateUrl: './add-provider-page.component.html',
  styleUrls: ['./add-provider-page.component.scss']
})
export class AddProviderPageComponent {

  constructor(
    public globalService: GlobalService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Add Provider'
    })
   }
}
