import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { EditAuthenticationComponent } from 'src/app/components/authentication/edit-authentication/edit-authentication.component';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { YesNoDialogComponent } from 'src/app/components/yes-no-dialog/yes-no-dialog.component';
import { Authentication } from 'src/app/models/authentication/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-authentications',
  templateUrl: './list-authentications.component.html',
  styleUrls: ['./list-authentications.component.scss']
})
export class ListAuthenticationsComponent implements OnInit {
  displayedColumns: string[] = ['serviceName', 'name', 'description', 'actions'];
  dataSource!: Authentication[];
  filteredData!: Authentication[];
  form!: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: '',
    });
    this.form.controls.search.valueChanges.subscribe(x => {
      this.filter(x);
    });
    this.getAuthentications();
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
    const path = "AUTHENTICATION-PAGE.DELETE-DIALOG.";

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      width: '300px',
      data: {
        title: this.translateService.instant(path + "TITLE"),
        text: this.translateService.instant(path + "TEXT"),
        color: 'warn',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authenticationService.delete$(id).pipe(take(1)).subscribe({
          next: () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: this.translateService.instant(path + "SUCCESS"),
            });

            this.getAuthentications();
          },
          error: () => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              data: this.translateService.instant(path + "ERROR"),
            });
          }
        });
      }
    });
  }

  private filter(text: string): void {
    if (text) {

    }

    text = text.toLocaleLowerCase();

    this.filteredData = this.dataSource.filter(data => {
      return data.name.toLocaleLowerCase().includes(text);
    });
  }

  private getAuthentications(): void {
    const userId = this.userService.getId();

    this.authenticationService.update$(
      this.authenticationService.getAll$(userId)
        .pipe(take(1))
    ).subscribe({
      next: (res) => {
        this.dataSource = res;
        this.filteredData = res;
      },
      error: () => {
        this.dataSource = [];
      }
    })
  }
}
