import { getResult } from './get-result';

describe('getResult', () => {
  it('should return "draw" when inputs are equal or both are "error" or "unknown"', () => {
    expect(getResult('5', '5')).toBe('draw');
    expect(getResult('error', 'error')).toBe('draw');
    expect(getResult('unknown', 'unknown')).toBe('draw');
  });

  it('should return "left" when right is "error" or "unknown" or left is greater', () => {
    expect(getResult('5', 'error')).toBe('left');
    expect(getResult('5', 'unknown')).toBe('left');
    expect(getResult('6', '5')).toBe('left');
  });

  it('should return "right" when left is "error" or "unknown" or right is greater', () => {
    expect(getResult('error', '5')).toBe('right');
    expect(getResult('unknown', '5')).toBe('right');
    expect(getResult('5', '6')).toBe('right');
  });
});
