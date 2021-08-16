import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Flow } from 'src/app/models/flow.model';
import { FormControl } from 'src/app/models/form-control.model';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @Input() data!: Flow;

  myForm: FormGroup = this.fb.group({});
  private formControl: FormControl = new FormControl(); 

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.myForm = this.formControl.toFormGroup(this.data);
  }

  onSubmit() {

  }
}
