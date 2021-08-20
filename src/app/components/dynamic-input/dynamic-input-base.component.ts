import { Directive, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Variable } from "src/app/models/variable.model";

@Directive()
export abstract class DynamicInputBaseComponent {
    @Input() parentForm!: FormGroup;
    @Input() variable!: Variable;
}