import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DynamicInputBaseComponent } from '../dynamic-input-base.component';

@Component({
  selector: 'app-text-suggestion-input',
  templateUrl: './text-suggestion-input.component.html',
})
export class TextSuggestionInputComponent extends DynamicInputBaseComponent {
  suggestions!: string[];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.suggestions = [];
    this.filteredOptions = this.parentForm.get(this.data.name)!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.suggestions!.filter(suggestion => suggestion.toLowerCase().includes(filterValue));
  }
}
