import PlayerOne from './PlayerOne'
import PlayerTwo from './PlayerTwo'

export default class Scene {
  canvas: any
  context: any
  nextGameButton: any
  message: any
  canvasWidth: any
  canvasHeight: any
  lineWidth: number
  cellLength: number
  currentSymbol: string
  player1: PlayerOne
  player2: PlayerTwo
  grid: string[][]

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
    this.nextGameButton.addEventListener('click', this.resetGame.bind(this))
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

  canvasClick(e: any) {
    const rectBoundings = this.canvas.getBoundingClientRect()

    const xClick = Math.round(e.clientX - rectBoundings.left)
    const yClick = Math.round(e.clientY - rectBoundings.top)

    const col = Math.floor(xClick / this.cellLength)
    const row = Math.floor(yClick / this.cellLength)

    if (this.grid[col][row] === '') {
      if (this.currentSymbol === 'X') {
        this.player1.drawXSymbol(xClick, yClick)
      } else {
        this.player2.drawCircleSymbol(xClick, yClick)
      }

      this.grid[col][row] = this.currentSymbol
      this.changeSymbol()
    }
  }

  changeSymbol() {
    if (this.currentSymbol === 'X') {
      this.currentSymbol = 'O'
    } else {
      this.currentSymbol = 'X'
    }
  }

  resetGame() {
    this.setupGrid()
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.drawGrid()
    this.currentSymbol = 'X'
  }
}
