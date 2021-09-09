import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { fieldContstants as fieldConsts } from 'src/app/constants/field.constants';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from 'src/app/models/form-control.model';
import { DynamicInput } from 'src/app/models/dynamic-input/dynamic-input.model';
import { AuthschemaProperty } from 'src/app/models/authentication/authschema-property.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-authentication',
  templateUrl: './edit-authentication.component.html',
  styleUrls: ['./edit-authentication.component.scss']
})
export class EditAuthenticationComponent implements OnInit {
  form!: FormGroup;
  serviceForm!: FormGroup;
  properties!: [string, AuthschemaProperty][];
  private formControl: FormControl = new FormControl();
  private originalAuthName!: string;

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditAuthenticationComponent>,
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; },
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(fieldConsts.authentication.description.maxLenfth)],
      serviceName: ['', Validators.required],
      serviceGroup: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    this.authenticationService.get$(this.data.id).pipe((take(1))).subscribe(res => {
      this.form.get('name')?.setValue(res.name);
      this.form.get('description')?.setValue(res.description);
      this.form.get('serviceName')?.setValue(res.serviceName);
      this.originalAuthName = res.name;

      this.authenticationService.getSchema$(res.serviceName).pipe(take(1)).subscribe(res => {
        this.properties = Object.entries(res.schema.properties);
        this.form.controls.serviceGroup = this.formControl.toAuthenticationFormGroup(res.schema);
        this.serviceForm = (this.form.controls.serviceGroup as FormGroup);
      });
    });
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();
    this.serviceForm.markAllAsTouched();

    if (this.form.valid && this.form.errors == null) {
      if (this.form.get('name')!.value == this.originalAuthName) {
        this.editService();
      } else {
        this.authenticationService.isUsed$(this.form.get('name')!.value).subscribe((res) => {
          if (!res) {
            this.editService();
          }
          else {
            this.form.get('name')!.setErrors({ inUse: this.translateService.instant("AUTHENTICATION-PAGE.ERROR-IN-USE") });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  propertyToDynamicInput(property: AuthschemaProperty, name: string): DynamicInput {
    return new DynamicInput({
      name: name,
      displayName: property.title,
      type: property.type,
      enum: property.enum,
      format: property.format,
      default: property.default,
    });
  }

  private editService(): void {
    this.authenticationService.edit$(
      this.data.id,
      this.form.get('name')!.value,
      this.form.get('description')!.value,
      this.serviceForm.value,
    ).pipe(take(1)).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: this.translateService.instant("AUTHENTICATION-PAGE.EDIT-SUCCESS"),
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.form.setErrors({ 'incorrect': true });
      }
    });
  }
}
