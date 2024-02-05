import { IClickCoordinates, ISceneConfig, IThemeConfig } from '../types'
import Player from './Player'

export default class Scene {
  cfg: ISceneConfig
  tCfg: IThemeConfig
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

  constructor(cfg: ISceneConfig, tCfg: IThemeConfig) {
    this.cfg = cfg
    this.tCfg = tCfg
    this.canvas = document.querySelector(this.cfg.canvasSelector)
    this.context = this.canvas.getContext('2d')
    this.nextGameButton = document.querySelector(this.cfg.nextBtnSelector)
    this.message = document.querySelector(this.cfg.messageSelector)
    this.players = []
    this.currentPlayer = 0
    this.gameOver = false

    this.canvasWidth = this.canvas.width
    this.canvasHeight = this.canvas.height
    this.lineWidth = this.tCfg.GRID_LINE_WIDTH
    this.cellLength = (this.canvasWidth - this.lineWidth * 3) / 3
  }

  public init(): void {
    this.drawGrid()
    this.setupGrid()

    this.players.push(new Player(this.cellLength, this.context, 'X', this.cfg, this.tCfg))
    this.players.push(new Player(this.cellLength, this.context, 'O', this.cfg, this.tCfg))

    this.canvas.addEventListener('click', this.canvasClick.bind(this))
    this.nextGameButton.addEventListener('click', this.resetGame.bind(this))
  }

  private drawGrid(): void {
    this.context.strokeStyle = this.tCfg.LINE_STYLE.lineColor
    this.context.lineWidth = this.lineWidth

    for (let i = 1; i < 3; i++) {
      const x = this.cellLength * i
      this.drawLine(x, 0, x, this.canvasHeight)
    }

    for (let i = 1; i < 3; i++) {
      const y = this.cellLength * i
      this.drawLine(0, y, this.canvasWidth, y)
    }
  }

  private drawLine(startX: number, startY: number, endX: number, endY: number): void {
    this.context.beginPath()
    this.context.moveTo(startX, startY)
    this.context.lineTo(endX, endY)
    this.context.stroke()
  }

  private setupGrid(): void {
    this.grid = Array(3).fill(null).map(() => Array(3).fill(''))
  }

  private getClickCoordinates(e: MouseEvent): IClickCoordinates {
    const rectBoundings = this.canvas.getBoundingClientRect()

    const xClick = Math.round(e.clientX - rectBoundings.left)
    const yClick = Math.round(e.clientY - rectBoundings.top)

    return { xClick, yClick }
  }

  private canvasClick(e: MouseEvent): void {
    const { xClick, yClick } = this.getClickCoordinates(e)

    const col = Math.floor(xClick / this.cellLength)
    const row = Math.floor(yClick / this.cellLength)

    if (!this.gameOver && this.grid[col][row] === '') {
      this.grid[col][row] = this.players[this.currentPlayer].symbol
      this.players[this.currentPlayer].makeMove(xClick, yClick)

      this.gameOver = this.checkForWinner()

      if (this.players.length - 1 !== this.currentPlayer) {
        this.currentPlayer++
      } else {
        this.currentPlayer = 0
      }
    }
  }

  private checkForWinner(): boolean {
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

  private checkRow(row: number): boolean {
    return (
      this.grid[row][0] !== '' &&
      this.grid[row][0] === this.grid[row][1] &&
      this.grid[row][1] === this.grid[row][2]
    )
  }

  private checkColumn(col: number): boolean {
    return (
      this.grid[0][col] !== '' &&
      this.grid[0][col] === this.grid[1][col] &&
      this.grid[1][col] === this.grid[2][col]
    )
  }

  private checkDiagonal(startRow: number, startCol: number, rowStep: number, colStep: number): boolean {
    const symbol = this.grid[startRow][startCol]

    return (
      symbol !== '' &&
      symbol === this.grid[startRow + rowStep][startCol + colStep] &&
      symbol === this.grid[startRow + 2 * rowStep][startCol + 2 * colStep]
    )
  }

  private checkDraw(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[i][j] === '') {
          return false
        }
      }
    }

    return true
  }

  private displayWin(winSymbol: string) {
    if (winSymbol == 'X') {
      this.message.textContent = `Player with ${winSymbol} win!`
    } else if (winSymbol == 'O') {
      this.message.textContent = `Player with ${winSymbol} win!`
    } else {
      this.message.textContent = 'Friendship won. You can play next one :)'
    }
  }

  private resetGame(): void {
    this.setupGrid()
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    this.drawGrid()
    this.message.textContent = ''
    this.gameOver = false
  }
}
