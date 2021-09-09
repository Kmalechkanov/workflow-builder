import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { YesNoDialogData } from "src/app/models/yes-no-dialog.model";

@Component({
    selector: 'app-yes-no-dialog',
    templateUrl: './yes-no-dialog.component.html',
    styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesNoDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<YesNoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData,
    ) { }

    proceed(): void {
        this.dialogRef.close(true);
    }

    cancel(): void {
        this.dialogRef.close(false);
    }
}