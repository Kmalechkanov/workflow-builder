import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Flow } from '../models/flow.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FormControlService {
    constructor() { }

    toFormGroup(flow: Flow): FormGroup {
        const group: any = {};

        flow.process.variables.filter(x => x.isInput).forEach(variable => {
            let validators = [];

            if (variable.required){
                validators.push(Validators.required);
            }
            if (variable.schema.type == 'array') {
                validators.push(Validators.pattern(env.regex.array.ofNumbers));
            }

            group[variable.name] = new FormControl('', Validators.compose(validators));
        });
        return new FormGroup(group);
    }
}