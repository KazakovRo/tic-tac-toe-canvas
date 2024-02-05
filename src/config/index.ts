import { ISceneConfig, IThemeConfig } from "../types"

export const sceneConfig: ISceneConfig = {
  canvasSelector: '#game-canvas',
  nextBtnSelector: '#next-game',
  messageSelector: '#message'
}

export const themeConfig: IThemeConfig = {
  GRID_LINE_WIDTH: 3,
  LINE_WIDTH: 8,
  LINE_LIMIT: 25,
  STROKE_STYLE: {
    X: 'black',
    O: 'red'
  },
  LINE_STYLE: {
    lineColor: 'black'
  }
}