import { Component, Input } from '@angular/core';
import { Provider } from 'src/app/models/provider.model';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss']
})
export class ProviderDetailsComponent {

  @Input() selectedProvider!: Provider;
  
  constructor() { }
}
