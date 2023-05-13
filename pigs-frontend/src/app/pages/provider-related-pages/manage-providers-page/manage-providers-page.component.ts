import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Provider } from 'src/app/models/provider.model';
import { DatabaseService } from 'src/app/services/database.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-manage-providers-page',
  templateUrl: './manage-providers-page.component.html',
  styleUrls: ['./manage-providers-page.component.scss']
})
export class ManageProvidersPageComponent {

  selectedProvider: Provider = {
    name: "",
    items: [],
    contactInfo: {
      address: "",
      fullName: "",
      phoneNumber: 0
    },
    path: 'providers',
    id: ""
  }

  constructor(
    public globalService: GlobalService,
    private _snackBar: MatSnackBar,
    private db: DatabaseService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Manage Providers'
    })
  }

  updateSelectedProvider(newProvider: Provider) {
    this.selectedProvider = newProvider;
  }

  updateProvider(updatedProvider: Provider) {
    let promise = this.db.updateDocument(this.selectedProvider, this.selectedProvider.path, this.selectedProvider.id);
    promise.then((_) => {
      this._snackBar.open("Provider updated successfully!", "Continue", { duration: 5000 });
    }).catch(error => {
      console.log(error)
      this._snackBar.open("Error during provider updating process, try later.", "Continue", { duration: 5000 });
    })
  }
}
