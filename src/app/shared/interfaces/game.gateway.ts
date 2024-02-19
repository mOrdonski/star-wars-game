export interface Game {
  play(): void;
  resetScore(): void;
  addPoints(result: string): void;
  countResults(leftCard: any, rightCard: any): void;
}
