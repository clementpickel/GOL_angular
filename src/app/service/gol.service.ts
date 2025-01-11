import { Injectable } from '@angular/core';
import Cell from '../class/cell';

@Injectable({
  providedIn: 'root'
})
export class GolService {
  width = 80
  height = 50
  widthArray: number[] = []
  heightArray: number[] = []
  offsetWidth = 0
  offsetHeight = 0

  caseSize = 10

  private generation = 0
  private cells: Cell[] = [new Cell(3, 3), new Cell(4, 4), new Cell(5, 4), new Cell(5, 3), new Cell(5, 2),]
  private cellHistory: Cell[][] = []
  private originalCells: Cell[] = []

  constructor() {
    this.widthArray = this.createArray(this.width, this.offsetWidth)
    this.heightArray = this.createArray(this.height, this.offsetHeight)
  }

  getGen(): number {
    return this.generation
  }

  addCell(cell: Cell) {
    this.cells.push(cell)
  }

  rmCell(cell: Cell) {
    const newCell: Cell[] = []
    for (let c of this.cells) {
      if (!(c.x == cell.x && c.y == cell.y)) {
        newCell.push(c)
      }
    }
    this.cells = newCell
  }

  nextGeneration() {
    if (this.generation == 0) {
      this.originalCells = this.cells
    }

    this.generation += 1
    let count = 0
    const nextCells: Cell[] = []
    const alreadyChecked: Cell[] = []

    for (let cell of this.cells) {
      for (let x = cell.x - 1; x <= cell.x + 1; x++) {
        for (let y = cell.y - 1; y <= cell.y + 1; y++) {
          if (!this.cellInclude(alreadyChecked, new Cell(x, y))) {
            alreadyChecked.push(new Cell(x, y))
             count = this.countNeighbours(x, y)
             if (count == 3) {
              nextCells.push(new Cell(x, y))
             } else if (count == 2) {
                if (this.isAlive(x, y)) {
                  nextCells.push(new Cell(x, y))
                }
             }
          }
        }
      }
    }

    this.cellHistory.push(this.cells)
    this.cells = nextCells

    if (this.cellHistory.length > 500) {
      this.cellHistory.splice(0, 1);
    }
  }

  previousGeneration() {
    const res = this.cellHistory.pop()
    if (res != undefined) {
      this.cells = res
      this.generation -= 1
    }
  }

  setWidth(w: number) {
    this.width = w
    this.widthArray = this.createArray(w, this.offsetWidth)
  }

  setHeight(h: number) {
    this.height = h
    this.heightArray = this.createArray(h, this.offsetWidth)
  }

  addOffsetWidth() {
    this.offsetWidth++
    this.widthArray = this.createArray(this.width, this.offsetWidth)
    console.log(this.offsetWidth)
    console.log(this.widthArray)
  }

  minusOffsetWidth() {
    this.offsetWidth--
    this.widthArray = this.createArray(this.width, this.offsetWidth)
  }

  addOffsetHeight() {
    this.offsetHeight--
    this.heightArray = this.createArray(this.height, this.offsetHeight)
  }

  minusOffsetHeight() {
    this.offsetHeight++
    this.heightArray = this.createArray(this.height, this.offsetHeight)
  }

  reset() {
    this.generation = 0
    this.cellHistory = []
    this.cells = this.originalCells
    this.originalCells = []
  }

  private createArray(length: number, offsett: number): Array<number> {
    const res: number[] = []

    for (let i = offsett; i < Number(length + offsett); i++) {
      res.push(i)
    }
    return res
  }

  private cellInclude(cellsArray: Cell[], cellToCompare: Cell) {
    for (let cell of cellsArray) {
      if (cell.x == cellToCompare.x && cell.y == cellToCompare.y) {
        return true 
      }
    }
    return false
  }

  private countNeighbours(cellx: number, celly: number): number {
    let count = 0
    for (let x = cellx - 1; x <= cellx + 1; x++) {
      for (let y = celly - 1; y <= celly + 1; y++) {
        if (x != cellx || y != celly) {
          if (this.isAlive(x, y)) {
            count++
          }
        }
      }
    }
    return count
  }

  public isAlive(x: number, y: number): boolean {
    for (let cell of this.cells) {
      if (cell.x == x && cell.y == y) {
        return true
      }
    }
    return false
  }

}
