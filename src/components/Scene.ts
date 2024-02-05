import { TGameSymbols, IClickCoordinates, ISceneConfig, IPlayer } from '../types'
import Player from './Player'

export default class Scene {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  nextGameButton: HTMLElement
  message: HTMLElement
  canvasWidth: number
  canvasHeight: number
  lineWidth: number
  cellLength: number
  grid: string[][]
  players: Player[]
  currentPlayer: number
  gameOver: boolean

  constructor(cfg: ISceneConfig) {
    this.canvas = document.querySelector(cfg.canvasSelector)
    this.context = this.canvas.getContext('2d')
    this.nextGameButton = document.querySelector(cfg.nextBtnSelector)
    this.message = document.querySelector(cfg.messageSelector)
    this.players = []
    this.currentPlayer = 0
    this.gameOver = false

    this.canvasWidth = this.canvas.width
    this.canvasHeight = this.canvas.height
    this.lineWidth = 3
    this.cellLength = (this.canvasWidth - this.lineWidth * 3) / 3
  }

  init(): void {
    this.drawGrid()
    this.setupGrid()

    this.players.push(new Player(this.cellLength, this.context, 'X'))
    this.players.push(new Player(this.cellLength, this.context, 'O'))

    this.canvas.addEventListener('click', this.canvasClick.bind(this))
    this.nextGameButton.addEventListener('click', this.resetGame.bind(this))
  }

  drawGrid(): void {
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

  setupGrid(): void {
    this.grid = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  }

  getClickCoordinates(e: MouseEvent): IClickCoordinates {
    const rectBoundings = this.canvas.getBoundingClientRect()

    const xClick = Math.round(e.clientX - rectBoundings.left)
    const yClick = Math.round(e.clientY - rectBoundings.top)

    return { xClick, yClick }
  }

  canvasClick(e: MouseEvent): void {
    const { xClick, yClick } = this.getClickCoordinates(e)

    const col = Math.floor(xClick / this.cellLength)
    const row = Math.floor(yClick / this.cellLength)

    if (!this.gameOver && this.grid[col][row] === '') {
      this.grid[col][row] = this.players[this.currentPlayer].symbol
      this.players[this.currentPlayer].chooseSymbol(xClick, yClick)
      console.warn('111', this.grid);

      this.gameOver = this.checkForWinner()

      if (this.players.length - 1 !== this.currentPlayer) {
        this.currentPlayer++
      } else {
        this.currentPlayer = 0
      }
    }
  }

  checkForWinner(): boolean {
    for (let row = 0; row < 3; row++) {
      if (this.checkRow(row)) {
        this.displayWin(this.players[this.currentPlayer].symbol)
        return true
      }
    }

    for (let col = 0; col < 3; col++) {
      if (this.checkColumn(col)) {
        this.displayWin(this.players[this.currentPlayer].symbol)
        return true
      }
    }

    if (this.checkDiagonal(0, 0, 1, 1) || this.checkDiagonal(0, 2, 1, -1)) {
      this.displayWin(this.players[this.currentPlayer].symbol)
      return true
    }


    if (this.checkDraw()) {
      this.displayWin('D')
    }

    return false
  }

  checkRow(row: number): boolean {
    return (
      this.grid[row][0] !== '' &&
      this.grid[row][0] === this.grid[row][1] &&
      this.grid[row][1] === this.grid[row][2]
    )
  }

  checkColumn(col: number): boolean {
    return (
      this.grid[0][col] !== '' &&
      this.grid[0][col] === this.grid[1][col] &&
      this.grid[1][col] === this.grid[2][col]
    )
  }

  checkDiagonal(startRow: number, startCol: number, rowStep: number, colStep: number): boolean {
    const symbol = this.grid[startRow][startCol]

    return (
      symbol !== '' &&
      symbol === this.grid[startRow + rowStep][startCol + colStep] &&
      symbol === this.grid[startRow + 2 * rowStep][startCol + 2 * colStep]
    )
  }

  checkDraw(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[i][j] === '') {
          return false;
        }
      }
    }

    return true
  }

  displayWin(winSymbol: string) {
    if (winSymbol == 'X') {
      this.message.textContent = `Player with ${winSymbol} win!`
    } else if (winSymbol == 'O') {
      this.message.textContent = `Player with ${winSymbol} win!`
    } else {
      this.message.textContent = 'Friendship won. You can play next one :)'
    }
  }

  resetGame(): void {
    this.setupGrid()
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.drawGrid()
    this.message.textContent = ''
    this.gameOver = false
  }
}
