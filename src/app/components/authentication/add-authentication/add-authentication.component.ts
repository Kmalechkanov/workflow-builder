import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { fieldContstants as fieldConsts } from 'src/app/constants/field.constants';
import { Authschema } from 'src/app/models/authentication/authschema-model.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from 'src/app/models/form-control.model';
import { DynamicInput } from 'src/app/models/dynamic-input/dynamic-input.model';
import { AuthschemaProperty } from 'src/app/models/authentication/authschema-property.model';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-authentication',
  templateUrl: './add-authentication.component.html',
  styleUrls: ['./add-authentication.component.scss']
})
export class AddAuthenticationComponent implements OnInit {
  form!: FormGroup;
  serviceForm?: FormGroup;
  services!: Authschema[];
  properties!: [string, AuthschemaProperty][];
  private formControl: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddAuthenticationComponent>,
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(fieldConsts.authentication.description.maxLenfth)],
      service: ['', Validators.required],
      serviceGroup: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    this.authenticationService.getSchemes$()
      .pipe(take(1)).subscribe(res => {
        this.services = res;
      });

    this.form.get("service")!.valueChanges.subscribe((res: Authschema) => {
      this.properties = Object.entries(res.schema.properties);
      this.form.controls.serviceGroup = this.formControl.toAuthenticationFormGroup(res.schema);
      this.serviceForm = (this.form.controls.serviceGroup as FormGroup);
    });
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();
    this.serviceForm?.markAllAsTouched();

    if (this.form.valid && this.form.errors == null) {
      this.authenticationService.isUsed$(this.form.get('name')!.value).subscribe((res) => {
        if (!res) {
          this.authenticationService.create$(
            this.form.get('name')!.value,
            this.form.get('description')!.value,
            this.form.get('service')!.value.serviceName,
            this.serviceForm?.value,
          ).pipe(take(1)).subscribe({
            next: () => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                data: this.translateService.instant("AUTHENTICATION-PAGE.CREATE-SUCCESS"),
              });
              this.dialogRef.close(true);
            },
            error: () => {
              this.form.setErrors({ 'incorrect': true });
            }
          });
        }
        else {
          this.form.get('name')!.setErrors({ inUse: this.translateService.instant("AUTHENTICATION-PAGE.ERROR-IN-USE") });
        }
      });
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
}
