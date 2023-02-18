import {
  sum,
  sub,
} from './calculator';

describe('calculators.ts 테스트', () => {
  it('sum(1, 2) === 3', () => {
    const a = 1;
    const b = 2;
    const result = sum(a, b);

    expect(result).toBe(3);
  });

  it('sub(7, 4) === 3', () => {
    const a = 7;
    const b = 4;
    const result = sub(a, b);

    expect(result).toBe(3);
  });
})