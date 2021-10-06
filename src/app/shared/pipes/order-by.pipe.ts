import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    items: object[],
    sortFields: string[],
    isAsc: boolean = false
  ): unknown {
    const itemsCopy: object[] = [...items];
    if (sortFields) {
      sortFields.forEach((sortField: string) =>
        itemsCopy.sort((a: object, b: object) => {
          const type = typeof a[sortField];

          if (type === 'number') {
            return isAsc
              ? a[sortField] - b[sortField]
              : b[sortField] - a[sortField];
          }

          if (type === 'string') {
            return isAsc
              ? (a[sortField] as string).localeCompare(b[sortField])
              : (b[sortField] as string).localeCompare(a[sortField]);
          }
        })
      );
    }
    return itemsCopy;
  }
}
