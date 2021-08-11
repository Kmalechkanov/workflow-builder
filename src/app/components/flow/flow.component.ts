import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flow } from 'src/app/models/flow.model';
import { FormControlService } from 'src/app/services/form-control.service';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @Input() data!: Flow;

  public myForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private formControlService: FormControlService,
  ) { }

  ngOnInit(): void {
    this.myForm = this.formControlService.toFormGroup(this.data);
  }

  onSubmit() {

  }
}
