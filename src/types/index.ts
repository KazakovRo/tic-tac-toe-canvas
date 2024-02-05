export interface ISceneConfig {
  canvasSelector: string
  nextBtnSelector: string
  messageSelector: string
}

export interface IPlayer {
  drawXSymbol(x: number, y: number): void
  drawCircleSymbol(x: number, y: number): void
  chooseSymbol(x: number, y: number): void
}

export interface IClickCoordinates {
  xClick: number;
  yClick: number;
}

export type TGameSymbols = 'X' | 'O'