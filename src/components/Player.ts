import { TGameSymbols, IPlayer } from "../types"

export default class Player implements IPlayer {
  xStart: number
  yStart: number
  xEnd: number
  yEnd: number
  cellLength: number
  ctx: CanvasRenderingContext2D
  symbol: TGameSymbols

  constructor(cellLength: number, ctx: CanvasRenderingContext2D, symbol: TGameSymbols) {
    this.cellLength = cellLength
    this.ctx = ctx
    this.symbol = symbol
  }

  drawXSymbol(x: number, y: number): void {
    const lineLimit = 25

    const findCellStartX = Math.floor(x / this.cellLength) * this.cellLength
    const findCellStartY = Math.floor(y / this.cellLength) * this.cellLength

    this.xStart = findCellStartX
    this.yStart = findCellStartY
    this.xEnd = this.xStart + this.cellLength
    this.yEnd = this.yStart + this.cellLength

    this.ctx.lineWidth = 6
    this.ctx.strokeStyle = 'black'
    this.ctx.beginPath()
    this.ctx.moveTo(this.xStart + lineLimit, this.yStart + lineLimit)
    this.ctx.lineTo(this.xEnd - lineLimit, this.yEnd - lineLimit)
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.moveTo(this.xStart + this.cellLength - lineLimit, this.yStart + lineLimit)
    this.ctx.lineTo(this.xEnd - this.cellLength + lineLimit, this.yEnd - lineLimit)
    this.ctx.stroke()
  }

  drawCircleSymbol(x: number, y: number): void {
    const radius = this.cellLength / 3

    const centerOfCellX = Math.floor(x / this.cellLength) * this.cellLength + this.cellLength / 2
    const centerOfCellY = Math.floor(y / this.cellLength) * this.cellLength + this.cellLength / 2

    this.ctx.lineWidth = 6
    this.ctx.strokeStyle = 'red'
    this.ctx.beginPath()
    this.ctx.arc(centerOfCellX, centerOfCellY, radius, 0, 2 * Math.PI)
    this.ctx.stroke()
  }

  chooseSymbol(x: number, y: number): void {
    if (this.symbol === 'X') {
      this.drawXSymbol(x, y)
    } else {
      this.drawCircleSymbol(x, y)
    }
  }
}
