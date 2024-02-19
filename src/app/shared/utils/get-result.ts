export function getResult(left: string, right: string): string {
  if (
    +left === +right ||
    (left === 'error' && right === 'error') ||
    (left === 'unknown' && right === 'unknown')
  ) {
    return 'draw';
  }
  if (right === 'error' || right === 'unknown') {
    return 'left';
  }
  if (left === 'error' || left === 'unknown') {
    return 'right';
  }
  if (+left > +right) {
    return 'left';
  }
  return 'right';
}
