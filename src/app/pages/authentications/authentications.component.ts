import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { AddAuthenticationComponent } from 'src/app/components/authentication/add-authentication/add-authentication.component';

@Component({
  selector: 'app-authentications',
  templateUrl: './authentications.component.html',
  styleUrls: ['./authentications.component.scss']
})
export class AuthenticationsComponent {
  resetList: Subject<boolean> = new Subject<boolean>();

  constructor(
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  createDialog(): void {
    const dialogRef = this.dialog.open(AddAuthenticationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resetList.next(true);
      }
    });
  }
}
