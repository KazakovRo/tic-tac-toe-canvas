export interface ISceneConfig {
  canvasSelector: string
  nextBtnSelector: string
  messageSelector: string
}

export interface IThemeConfig {
  GRID_LINE_WIDTH: number
  LINE_WIDTH: number;
  LINE_LIMIT: number;
  STROKE_STYLE: {
    X: string;
    O: string;
  };
  LINE_STYLE: {
    lineColor: string;
  };
}

export interface IPlayer {
  drawXSymbol(x: number, y: number): void
  drawCircleSymbol(x: number, y: number): void
  makeMove(x: number, y: number): void
}

export interface IClickCoordinates {
  xClick: number
  yClick: number
}

export type TGameSymbols = 'X' | 'O'