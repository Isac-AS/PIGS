import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Provider } from 'src/app/models/provider.model';

@Component({
  selector: 'app-provider-modification',
  templateUrl: './provider-modification.component.html',
  styleUrls: ['./provider-modification.component.scss']
})
export class ProviderModificationComponent implements OnChanges {

  @Input() selectedProvider!: Provider;
  @Output() selectedProviderEmitter: any = new EventEmitter<any>();

  providerForm = this.fb.group({
    name: ["", Validators.required],
    fullName: ["", Validators.required],
    phoneNumber: [0, Validators.required],
    address: ["", Validators.required],
  })

  constructor(
    private fb: FormBuilder,
  ) {  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("[DEBUG - PROVIDER MODIFICATION COMPONENT - ngOnChanges: ]")
    console.log(changes)
    let updatedProvider: Provider = changes['selectedProvider'].currentValue;
    this.selectedProvider = updatedProvider;
    this.providerForm.setValue({
      name: updatedProvider.name,
      fullName: updatedProvider.contactInfo.fullName,
      phoneNumber: updatedProvider.contactInfo.phoneNumber,
      address: updatedProvider.contactInfo.address,
    })
  }

  addItem(item: any) {
    this.selectedProvider.items.push(item);
  }

  removeItem(itemToRemove: any) {
    this.selectedProvider.items = this.selectedProvider.items.filter(item => item.id != itemToRemove.id);
  }

  emitSelectedProvider() {
    this.selectedProvider.name = this.providerForm.value.name!;
    this.selectedProvider.contactInfo.address = this.providerForm.value.address!;
    this.selectedProvider.contactInfo.fullName = this.providerForm.value.fullName!;
    this.selectedProvider.contactInfo.phoneNumber = this.providerForm.value.phoneNumber!;
    this.selectedProviderEmitter.emit(this.selectedProvider);
  }
}
