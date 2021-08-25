import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {
    transform(properties: { [key: string]: any }, ...args: any[]) {
        let tempObj: Array<{ key: string, value: any }> = [];

        for (let [value] of Object.entries(properties)) {
            tempObj.push({ key: value[0], value: value[1] });
        }

        return tempObj;
    }
}