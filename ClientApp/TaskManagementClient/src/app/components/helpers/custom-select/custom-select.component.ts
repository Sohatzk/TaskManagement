import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Guid } from "guid-typescript";
import { SelectItemView } from "../../../models/selectItemView";

@Component({
  selector: 'app-custom-select',
  imports: [],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css'
})
export class CustomSelectComponent {
  protected isSelectActive = false;
  protected selectedValue: string = "Select a value";
  @Input() selectOptions: SelectItemView[] = [];
  @Output() selectItemEmitter = new EventEmitter<Guid>();

  selectItem(selectedOption: SelectItemView, event: MouseEvent): void {
    let eventTarget = event.target as HTMLElement;
    if (eventTarget.classList.contains('active')) {
      return;
    }

    let activeElements = document.getElementsByClassName('active');
    for (let i = 0; i < activeElements.length; i++) {
      activeElements[i].classList.remove('active');
    }

    eventTarget.classList.add('active');
    this.selectedValue = selectedOption.displayValue;
    this.selectItemEmitter.emit(selectedOption.idValue);
  }

  toggleSelectState(): void {
    this.isSelectActive = !this.isSelectActive;
  }

  protected readonly SelectItemView = SelectItemView;
}
