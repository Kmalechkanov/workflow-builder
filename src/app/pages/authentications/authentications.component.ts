import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAuthenticationComponent } from 'src/app/components/authentication/add-authentication/add-authentication.component';

@Component({
  selector: 'app-authentications',
  templateUrl: './authentications.component.html',
  styleUrls: ['./authentications.component.scss']
})
export class AuthenticationsComponent {
  constructor(
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  createDialog(): void {
    const dialogRef = this.dialog.open(AddAuthenticationComponent);
  }
}
