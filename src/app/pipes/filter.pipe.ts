import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], text: string): string[] {

        if (!items) {
            return [];
        }
        if (!text) {
            return items;
        }

        text = text.toLocaleLowerCase();

        return items.filter(it => {
            return it.toLocaleLowerCase().includes(text);
        });
    }
}