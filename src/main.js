class Scene {
  constructor() {
    this.canvas = document.querySelector('#game-canvas')
    this.context = this.canvas.getContext('2d')
    this.nextGameButton = document.querySelector('#next-game')
    this.message = document.querySelector('#message')

    this.canvasWidth = this.canvas.width
    this.canvasHeight = this.canvas.height
    this.lineWidth = 3
    this.cellLength = (this.canvasWidth - this.lineWidth * 3) / 3

    this.currentSymbol = 'X'
  }

  init() {
    this.drawGrid()
    this.setupGrid()
    this.player1 = new PlayerOne(this.cellLength, this.context)
    this.player2 = new PlayerTwo(this.cellLength, this.context)

    this.canvas.addEventListener('click', this.canvasClick.bind(this))
  }

  drawGrid() {
    this.context.strokeStyle = 'black'

    this.context.beginPath()
    this.context.lineWidth = this.lineWidth

    this.context.moveTo(this.cellLength, 0)
    this.context.lineTo(this.cellLength, this.canvasHeight)
    this.context.stroke()

    this.context.moveTo(this.cellLength * 2, 0)
    this.context.lineTo(this.cellLength * 2, this.canvasHeight)
    this.context.stroke()

    this.context.moveTo(this.cellLength * 2, 0)
    this.context.lineTo(this.cellLength * 2, this.canvasHeight)
    this.context.stroke()

    this.context.moveTo(0, this.cellLength)
    this.context.lineTo(this.canvasWidth, this.cellLength)
    this.context.stroke()

    this.context.moveTo(0, this.cellLength * 2)
    this.context.lineTo(this.canvasWidth, this.cellLength * 2)
    this.context.stroke()
  }

  setupGrid() {
    this.grid = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }

  canvasClick(e) {
    const rectBoundings = this.canvas.getBoundingClientRect()

    const xClick = Math.round(e.clientX - rectBoundings.left)
    const yClick = Math.round(e.clientY - rectBoundings.top)

    if (this.currentSymbol === 'X') {
      this.player1.drawXSymbol(xClick, yClick)
      this.changeSymbol('X')
    } else {
      this.player2.drawCircleSymbol(xClick, yClick)
      this.changeSymbol('O')
    }
  }

  changeSymbol(prevSymbol) {
    if (prevSymbol === 'X') {
      this.currentSymbol = 'O'
    } else {
      this.currentSymbol = 'X'
    }
  }
}

class PlayerOne {
  constructor(cellLength, ctx) {
    this.cellLength = cellLength
    this.ctx = ctx
  }

  drawXSymbol(x, y) {
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

class PlayerTwo {
  constructor(cellLength, ctx) {
    this.cellLength = cellLength
    this.ctx = ctx
  }

  drawCircleSymbol(x, y) {
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

const game = new Scene()
game.init()
