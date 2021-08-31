import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { AddAuthenticationComponent } from 'src/app/components/authentication/add-authentication/add-authentication.component';
import { EditAuthenticationComponent } from 'src/app/components/authentication/edit-authentication/edit-authentication.component';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { YesNoDialogComponent } from 'src/app/components/yes-no-dialog/yes-no-dialog.component';
import { Authentication } from 'src/app/models/authentication/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authentications',
  templateUrl: './authentications.component.html',
  styleUrls: ['./authentications.component.scss']
})
export class AuthenticationsComponent implements OnInit {
  displayedColumns: string[] = ['serviceName', 'name', 'description', 'actions'];
  dataSource!: Authentication[];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAuthentications();
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(AddAuthenticationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAuthentications();
      }
    });
  }

  editDialog(id: number): void {
    const dialogRef = this.dialog.open(EditAuthenticationComponent, {
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAuthentications();
      }
    });
  }

  deleteDialog(id: number): void {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete authentications',
        text: 'Are you sure you want to pernamently delete this authentication',
        color: 'warn',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authenticationService.delete$(id).pipe(take(1)).subscribe({
          next: () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: "Succesfully deleted authentication!"
            });

            this.getAuthentications();
          },
          error: () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: "Error! Authnetication is not deleted."
            });
          }
        });
      }
    });
  }

  private getAuthentications(): void {
    const userId = this.userService.getId();
    this.authenticationService.getAll$(userId)
      .pipe(take(1)).subscribe({
        next: (res) => {
          this.dataSource = res;
        },
        error: () => {
          this.dataSource = [];
        }
      });
  }
}
