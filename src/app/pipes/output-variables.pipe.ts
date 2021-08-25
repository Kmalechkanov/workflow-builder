import { Pipe, PipeTransform } from "@angular/core";
import { Variable } from "../models/flow/variable.model";

@Pipe({
    name: 'outputVariables'
})
export class OutputVariablesPipe implements PipeTransform {
    transform(variables: Variable[], ...args: any[]) {
        return variables.filter(v => v.isOutput);
    }
}