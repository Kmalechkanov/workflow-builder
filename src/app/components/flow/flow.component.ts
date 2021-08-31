import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicInput } from 'src/app/models/dynamic-input/dynamic-input.model';
import { Flow } from 'src/app/models/flow/flow.model';
import { Variable } from 'src/app/models/flow/variable.model';
import { FormControl } from 'src/app/models/form-control.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DynamicInputBaseComponent } from '../dynamic-input/dynamic-input-base.component';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @Input() data!: Flow;

  myForm: FormGroup = this.fb.group({});

  component = DynamicInputBaseComponent;
  private formControl: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.myForm = this.formControl.toFlowFormGroup(this.data);
  }

  onSubmit() {
  }

  variableToDynamicInput(variable: Variable): DynamicInput {
    let tempEnum: string[] | Observable<string[]> | undefined = variable.schema.enum;
    if (variable.meta.authType) {
      tempEnum = this.authenticationService.getAllOf$(variable.meta.authType!)
        .pipe(map(auths => {
          let temp: string[] = [];
          auths.forEach(auth => {
            temp.push(auth.name);
          });
          return temp;
        }));
    }

    return new DynamicInput({
      name: variable.name,
      required: variable.required,
      type: variable.schema.type,
      additionalProperties: variable.schema.additionalProperties,
      items: variable.schema.additionalProperties,
      properties: variable.schema.properties,
      enum: tempEnum,
      description: variable.meta.description,
      displayName: variable.meta.displayName,
    });
  }
}
