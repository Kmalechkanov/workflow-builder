import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { fieldContstants as fieldConsts } from 'src/app/constants/field.constants';
import { Authschema } from 'src/app/models/authentication/authschema-model.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from 'src/app/models/form-control.model';
import { DynamicInput } from 'src/app/models/dynamic-input/dynamic-input.model';
import { AuthschemaProperty } from 'src/app/models/authentication/authschema-property.model';

@Component({
  selector: 'app-add-authentication',
  templateUrl: './add-authentication.component.html',
  styleUrls: ['./add-authentication.component.scss']
})
export class AddAuthenticationComponent implements OnInit {
  form!: FormGroup;
  serviceForm!: FormGroup;
  services!: Authschema[];
  properties!: [string, AuthschemaProperty][];

  private formControl: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(fieldConsts.authentication.description.maxLenfth)],
      service: ['', Validators.required],
      serviceGroup: this.fb.group({}),
    });
  }

  ngOnInit(): void {
    this.authenticationService.getSchemes()
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

  }

  onCancel(): void {
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
