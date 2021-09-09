import { Component, OnInit } from '@angular/core';
import { DynamicInputBaseComponent } from '../dynamic-input-base.component';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
})
export class SelectInputComponent extends DynamicInputBaseComponent implements OnInit {
  options?: string[];
  open: boolean = false;

  ngOnInit(): void {
    if (Array.isArray(this.data.enum)) {
      this.options = this.data.enum;
      this.open = true;
    }
    else {
      this.data.enum!.subscribe({
        next: (res) => {
          this.options = res;
          this.open = true;
        },
        error: (err) => console.error('Error', err)
      });
    }
  }
}
