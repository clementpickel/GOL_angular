import { Component, Input } from '@angular/core';
import { GolService } from '../../service/gol.service';
import { CommonModule } from '@angular/common';
import Cell from '../../class/cell';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './case.component.html',
  styleUrl: './case.component.scss'
})
export class CaseComponent {
  @Input() x: number = 0
  @Input() y: number = 0

  constructor(public gol: GolService) {}

  addCell() {
    if (!this.gol.isAlive(this.x, this.y)) {
      this.gol.addCell(new Cell(this.x, this.y))
    } else {
      this.gol.rmCell(new Cell(this.x, this.y))
    }
  }
}
