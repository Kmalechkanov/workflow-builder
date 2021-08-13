import { Component, Input, OnInit } from '@angular/core';
import { Flow } from 'src/app/models/flow.model';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {
  @Input() data!: Flow;

  constructor() { }

  ngOnInit(): void {
  }

}
