import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(
    items: object[],
    sortFields: string[],
    isAsc: boolean = false
    // почему unknown, если возвращается массив того же типа, что и пришел
  ): unknown {
    const itemsCopy: object[] = [...items];
    if (sortFields) {
      sortFields.forEach((sortField: string) =>
        itemsCopy.sort((a: object, b: object) => {
          const type = typeof a[sortField];

// Этот код не даст результат, если придет несколько полей для сортировки
// Он буде просто пересортировывать элементы по кажому полю и в итоге вернет массив
// отсортированный по последнему полю.


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
