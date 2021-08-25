import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AddAuthenticationComponent } from 'src/app/components/add-authentication/add-authentication.component';
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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const userId = this.userService.getId()
    this.authenticationService.getAll(userId)
      .pipe(take(1)).subscribe((res) => {
        this.dataSource = res;
      });
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(AddAuthenticationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
