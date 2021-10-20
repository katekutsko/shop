import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    items: object[],
    sortFields: string[],
    isAsc: boolean = false
  ): object[] {
    const itemsCopy: object[] = [...items];
    if (sortFields) {
      itemsCopy.sort((a: object, b: object) => {
        for (const sortField of sortFields) {
          const comparationResult: number = this.compareItemsByField(
            a,
            b,
            sortField,
            isAsc
          );
          if (comparationResult === 0) {
            continue;
          } else {
            return comparationResult;
          }
        }
      });
    }
    return itemsCopy;
  }

  private compareItemsByField(
    a: object,
    b: object,
    field: string,
    isAsc: boolean
  ): number {
    const type = typeof a[field];

    if (type === 'number') {
      return isAsc ? a[field] - b[field] : b[field] - a[field];
    }

    if (type === 'string') {
      return isAsc
        ? (a[field] as string).localeCompare(b[field])
        : (b[field] as string).localeCompare(a[field]);
    }
  }
}
