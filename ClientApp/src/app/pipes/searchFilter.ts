import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'searchFilter'})
export class SearchFilterPipe implements PipeTransform {
    transform(list: any[], filterText: string): any {
        if (list?.length) {
            list = list.filter(item => {
                if (filterText && item.title.toLowerCase().includes(filterText)) {
                    item.highlighted = true;
                } else {
                    item.highlighted = false;
                }
                return item;
            });
        }
        return list;
    }
}