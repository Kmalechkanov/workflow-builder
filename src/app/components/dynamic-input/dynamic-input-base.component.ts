import { Directive, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicInput } from "src/app/models/dynamic-input/dynamic-input.model";

@Directive()
export abstract class DynamicInputBaseComponent {
    @Input() parentForm!: FormGroup;
    @Input() data!: DynamicInput;
}