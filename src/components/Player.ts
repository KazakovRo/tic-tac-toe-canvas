import { TGameSymbols, IPlayer, ISceneConfig, IThemeConfig } from "../types"

export default class Player implements IPlayer {
  cfg: ISceneConfig
  tCfg: IThemeConfig
  lineLimit: number
  xStart: number
  yStart: number
  xEnd: number
  yEnd: number
  cellLength: number
  ctx: CanvasRenderingContext2D
  symbol: TGameSymbols

  constructor(cellLength: number, ctx: CanvasRenderingContext2D, symbol: TGameSymbols, cfg: ISceneConfig, tCfg: IThemeConfig) {
    this.cfg = cfg
    this.tCfg = tCfg
    this.lineLimit = this.tCfg.LINE_LIMIT
    this.cellLength = cellLength
    this.ctx = ctx
    this.symbol = symbol
  }

  public drawXSymbol(x: number, y: number): void {
    const { xStart, yStart, xEnd, yEnd } = this.calculateCellBounds(x, y)

    this.ctx.lineWidth = this.tCfg.LINE_WIDTH
    this.ctx.strokeStyle = this.tCfg.STROKE_STYLE.X
    this.ctx.beginPath()
    this.ctx.moveTo(xStart + this.lineLimit, yStart + this.lineLimit)
    this.ctx.lineTo(xEnd - this.lineLimit, yEnd - this.lineLimit)
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.moveTo(xStart + this.cellLength - this.lineLimit, yStart + this.lineLimit)
    this.ctx.lineTo(xEnd - this.cellLength + this.lineLimit, yEnd - this.lineLimit)
    this.ctx.stroke()
  }

  public drawCircleSymbol(x: number, y: number): void {
    const radius = this.cellLength / 3
    const { centerX, centerY } = this.calculateCellCenter(x, y)

    this.ctx.lineWidth = this.tCfg.LINE_WIDTH
    this.ctx.strokeStyle = this.tCfg.STROKE_STYLE.O
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    this.ctx.stroke()
  }

  private calculateCellBounds(x: number, y: number) {
    const xStart = Math.floor(x / this.cellLength) * this.cellLength
    const yStart = Math.floor(y / this.cellLength) * this.cellLength
    return { xStart, yStart, xEnd: xStart + this.cellLength, yEnd: yStart + this.cellLength }
  }

  private calculateCellCenter(x: number, y: number) {
    const { xStart, yStart } = this.calculateCellBounds(x, y)
    return { centerX: xStart + this.cellLength / 2, centerY: yStart + this.cellLength / 2 }
  }

  public makeMove(x: number, y: number): void {
    if (this.symbol === 'X') {
      this.drawXSymbol(x, y)
    } else {
      this.drawCircleSymbol(x, y)
    }
  }
}
