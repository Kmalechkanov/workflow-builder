import { Pipe, PipeTransform } from "@angular/core";
import { Variable } from "../models/flow/variable.model";

@Pipe({
    name: 'inputVariables'
})
export class InputVariablesPipe implements PipeTransform {
    transform(variables: Variable[], ...args: any[]) {
        return variables.filter(v => v.isInput);
    }
}