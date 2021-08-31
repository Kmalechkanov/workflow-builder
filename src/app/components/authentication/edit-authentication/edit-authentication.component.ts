import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { fieldContstants as fieldConsts } from 'src/app/constants/field.constants';
import { Authschema } from 'src/app/models/authentication/authschema-model.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from 'src/app/models/form-control.model';
import { DynamicInput } from 'src/app/models/dynamic-input/dynamic-input.model';
import { AuthschemaProperty } from 'src/app/models/authentication/authschema-property.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-edit-authentication',
  templateUrl: './edit-authentication.component.html',
  styleUrls: ['./edit-authentication.component.scss']
})
export class EditAuthenticationComponent implements OnInit {
  form!: FormGroup;
  serviceForm!: FormGroup;
  services!: Authschema[];
  properties!: [string, AuthschemaProperty][];
  private formControl: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditAuthenticationComponent>,
    private authenticationService: AuthenticationService,
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

      this.authenticationService.getSchema$(res.serviceName).pipe(take(1)).subscribe(res => {
        this.properties = Object.entries(res.schema.properties);
        this.form.controls.serviceGroup = this.formControl.toAuthenticationFormGroup(res.schema);
        this.serviceForm = (this.form.controls.serviceGroup as FormGroup);
      });
    });
  }

  onSubmit(): void {
    this.form.updateValueAndValidity();
    let valid = true;
    if (this.form.valid && this.form.errors == null) {
      // todo unique auth name
    }
    else {
      valid = false;
    }

    if (this.serviceForm.valid && this.serviceForm.errors == null) {
      // todo fix not coloring red when error
    }
    else {
      valid = false;
    }

    if (valid) {
      this.authenticationService.edit$(
        this.data.id,
        this.form.get('name')!.value,
        this.form.get('description')!.value,
        this.serviceForm.value,
      ).pipe(take(1)).subscribe({
        next: () => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: "Changes saved!"
          });
          this.dialogRef.close(true);
        },
        error: () => {
          this.form.setErrors({ 'incorrect': true });
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
