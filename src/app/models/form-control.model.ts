import { FormControl as FC, FormGroup, Validators } from '@angular/forms';
import { Flow } from './flow/flow.model';
import { regexConstants as regex } from '../constants/regex.constants';
import { AuthschemaSchema } from './authentication/authschema-schema.model';

export class FormControl {
    constructor() { }

    toFlowFormGroup(flow: Flow): FormGroup {
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

    toAuthenticationFormGroup(authschema: AuthschemaSchema): FormGroup {
        const group: any = {};
        let value: any;

        for (let [key,schema] of Object.entries(authschema.properties)) {
            let validators = [];
            value = '';

            if (authschema.required.includes(key)) {
                validators.push(Validators.required);
            }
            if (schema.default) {
                value = schema.default;
            }

            group[key] = new FC(value, Validators.compose(validators));
        }

        return new FormGroup(group);
    }
}