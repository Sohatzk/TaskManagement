
import { Guid } from "guid-typescript";
export class SelectItemView {
  displayValue: string;
  idValue: Guid;

  public constructor(
    displayValue: string,
    idValue: Guid) {
    this.displayValue = displayValue;
    this.idValue = idValue;
  }
}
