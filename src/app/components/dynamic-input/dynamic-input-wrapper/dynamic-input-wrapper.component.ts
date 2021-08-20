import { Component, Type } from "@angular/core";
import { ArrayInputComponent } from "../array-input/array-input.component";
import { BooleanInputComponent } from "../boolean-input/boolean-input.component";
import { DynamicInputBaseComponent } from "../dynamic-input-base.component";
import { IntegerInputComponent } from "../integer-input/integer-input.component";
import { NumberInputComponent } from "../number-input/number-input.component";
import { SelectInputComponent } from "../select-input/select-input.component";
import { TextInputComponent } from "../text-input/text-input.component";
import { TextSuggestionInputComponent } from "../text-suggestion-input/text-suggestion-input.component";

@Component({
    selector: 'app-dynamic-input-wrapper',
    templateUrl: './dynamic-input-wrapper.component.html',
})
export class DynamicInputWrapperComponent extends DynamicInputBaseComponent {
    get component(): Type<DynamicInputBaseComponent> {
        if (this.variable.schema.enum) {
            return SelectInputComponent;
        }
        if (this.variable.meta.authType) {
            return TextSuggestionInputComponent;
        }

        switch (this.variable.schema.type) {
            case 'array':
                return ArrayInputComponent;
            case 'number':
                return NumberInputComponent;
            case 'integer':
                return IntegerInputComponent;
            case 'boolean':
                return BooleanInputComponent;
        }
        return TextInputComponent;
    }
}