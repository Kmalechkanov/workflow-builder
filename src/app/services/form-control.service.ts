import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Flow } from '../models/flow.model';

@Injectable({
    providedIn: 'root',
})
export class FormControlService {
    constructor() { }

    toFormGroup(flow: Flow): FormGroup {
        const group: any = {};

        flow.process.variables.filter(x => x.isOutput).forEach(variable => {
            group[variable.name] = variable.required
                ? new FormControl('', Validators.required)
                : new FormControl('');
        });
        return new FormGroup(group);
    }
}