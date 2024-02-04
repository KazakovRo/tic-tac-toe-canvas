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
  }

  init() {
    this.drawGrid()
    console.warn('canv', this.canvasWidth, this.canvasHeight)
    // this.setupGrid()

    // this.addListeners() // grid click + reset click
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
}

const game = new Scene()
game.init()
