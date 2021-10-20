import { OrderByPipe } from './order-by.pipe';

fdescribe(OrderByPipe.name, () => {
  describe(OrderByPipe.prototype.transform.name, () => {
    it('should sort items according to parameters', () => {
      const a: any[] = [
        {
          a: 10,
          b: 5,
          c: 3,
        },
        {
          a: 10,
          b: 5,
          c: 3,
        },
        {
          a: 10,
          b: 5,
          c: 1,
        },
        {
          a: 12,
          b: 4,
          c: 8,
        },
        {
          a: 8,
          b: 3,
          c: 12,
        },
      ];
      expect(new OrderByPipe().transform(a, ['a', 'b', 'c'], false)).toEqual([
        {
          a: 12,
          b: 4,
          c: 8,
        },
        {
          a: 10,
          b: 5,
          c: 3,
        },
        {
          a: 10,
          b: 5,
          c: 3,
        },
        {
          a: 10,
          b: 5,
          c: 1,
        },
        {
          a: 8,
          b: 3,
          c: 12,
        },
      ]);
    });
  });
});
