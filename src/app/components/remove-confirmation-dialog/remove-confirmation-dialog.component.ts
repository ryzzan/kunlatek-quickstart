import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DialogData } from "../logout-confirmation-dialog/logout-confirmation-dialog.component";

@Component({
  selector: "app-remove-confirmation-dialog",
  templateUrl: "./remove-confirmation-dialog.component.html",
  styleUrls: ["./remove-confirmation-dialog.component.scss"],
})
export class RemoveConfirmationDialogComponent {
  constructor(
    public removeConfirmationDialogDialogRef: MatDialogRef<
      RemoveConfirmationDialogComponent
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  RemoveConfirmationDialogOnNoClick(): void {
    this.removeConfirmationDialogDialogRef.close();
  }
}
