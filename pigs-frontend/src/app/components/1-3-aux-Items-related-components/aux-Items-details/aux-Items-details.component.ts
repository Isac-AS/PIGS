import { Component, Input } from '@angular/core';
import { AuxItem } from 'src/app/models/stock.model';

@Component({
  selector: 'app-aux-Item-details',
  templateUrl: './aux-Items-details.component.html',
  styleUrls: ['./aux-Items-details.component.scss']
})
export class AuxItemDetailsComponent {

  @Input() selectedAuxItem!: AuxItem;

  constructor() { }
}
