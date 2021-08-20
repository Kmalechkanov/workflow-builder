import { FormControl as FC, FormGroup, Validators } from '@angular/forms';
import { Flow } from './flow.model';
import { regexConstants as regex } from '../constants/regex.constants';

export class FormControl {
    constructor() { }

    toFormGroup(flow: Flow): FormGroup {
        const group: any = {};
        let value: any;

        flow.process.variables.filter(x => x.isInput).forEach(variable => {
            let validators = [];
            value = '';

            if (variable.required) {
                validators.push(Validators.required);
            }
            if (variable.schema.type == 'array') {
                validators.push(Validators.pattern(regex.array.ofNumbers));
            }
            else if (variable.schema.type == 'boolean') {
                value = false;
            }

            group[variable.name] = new FC(value, Validators.compose(validators));
        });
        return new FormGroup(group);
    }
}