import { FormControl as FC, FormGroup, Validators } from '@angular/forms';
import { Flow } from './flow.model';
import { regexConstants as regex } from '../constants/regex.constants';

export class FormControl {
    constructor() { }

    toFormGroup(flow: Flow): FormGroup {
        const group: any = {};

        flow.process.variables.filter(x => x.isInput).forEach(variable => {
            let validators = [];

            if (variable.required){
                validators.push(Validators.required);
            }
            if (variable.schema.type == 'array') {
                validators.push(Validators.pattern(regex.array.ofNumbers));
            }
 
            group[variable.name] = new FC('', Validators.compose(validators));
        });
        return new FormGroup(group);
    }
}