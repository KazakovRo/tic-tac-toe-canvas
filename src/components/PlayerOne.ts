export default class PlayerOne {
  [x: string]: any

  constructor(cellLength: any, ctx: any) {
    this.cellLength = cellLength
    this.ctx = ctx
  }

  drawXSymbol(x: number, y: number) {
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
}
