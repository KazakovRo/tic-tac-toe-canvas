export default class PlayerTwo {
  cellLength: any
  ctx: any

  constructor(cellLength: any, ctx: any) {
    this.cellLength = cellLength
    this.ctx = ctx
  }

  drawCircleSymbol(x: number, y: number) {
    const radius = this.cellLength / 3

    const centerOfCellX = Math.floor(x / this.cellLength) * this.cellLength + this.cellLength / 2
    const centerOfCellY = Math.floor(y / this.cellLength) * this.cellLength + this.cellLength / 2

    this.ctx.lineWidth = 6
    this.ctx.strokeStyle = 'red'
    this.ctx.beginPath()
    this.ctx.arc(centerOfCellX, centerOfCellY, radius, 0, 2 * Math.PI)
    this.ctx.stroke()
  }
}
