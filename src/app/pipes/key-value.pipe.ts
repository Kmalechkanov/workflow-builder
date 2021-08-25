import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {
    transform(properties: { [key: string]: any }, ...args: any[]) {
        let tempObj: Array<{ key: string, value: any }> = [];

        if (!properties) {
            return tempObj;
        }

        properties.forEach((property: Array<any>) => {
            tempObj.push({ key: property[0], value: property[1] });
        });

        return tempObj;
    }
}