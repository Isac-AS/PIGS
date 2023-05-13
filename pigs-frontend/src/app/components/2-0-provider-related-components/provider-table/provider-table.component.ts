import { Component, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Provider } from 'src/app/models/provider.model';
import { DatabaseService } from 'src/app/services/database.service';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';

@Component({
  selector: 'app-provider-table',
  templateUrl: './provider-table.component.html',
  styleUrls: ['./provider-table.component.scss']
})
export class ProviderTableComponent {

  @Output() selectedProviderEmitter: any = new EventEmitter<any>()

  providerList: Provider[] = [];
  displayedColumns: string[] = ['selected', 'name', 'address', 'phoneNumber', 'delete']
  dataSource: MatTableDataSource<Provider>;

  selectedProvider: Provider = {
    name: "",
    items: [],
    contactInfo: {
      address: "",
      fullName: "",
      phoneNumber: 0
    },
    path: "providers",
    id: ""
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private database: DatabaseService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.providerList);
    this.fetchProviders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchProviders() {
    this.database.readCollection<Provider>("providers").subscribe({
      next: (providers) => {
        console.log("[DEBUG] - Providers collection")
        console.log(providers)
        this.providerList = providers;
        this.dataSource = new MatTableDataSource(this.providerList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(provider_id: string) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteProvider(provider_id)
        }
        console.log(result)
      }
    )
  }

  deleteProvider(provider_id: string) {
    this.database.deleteDocument("providers", provider_id).catch(
      (error) => {
        console.log(error)
      })
    this.fetchProviders();
  }

  emitProvider(provider: Provider) {
    this.selectedProviderEmitter.emit(provider)
  }
}
