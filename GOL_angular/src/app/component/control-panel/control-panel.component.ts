import { Component } from '@angular/core';
import { GolService } from '../../service/gol.service';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {

  form: FormGroup = new FormGroup({
    width: new FormControl(this.gol.width, [Validators.required, Validators.min(1)]),
    height: new FormControl(this.gol.height, [Validators.required, Validators.min(1)]),
    time: new FormControl(0.2, [Validators.required, Validators.min(0.01)]),
    size: new FormControl(30, [Validators.required, Validators.min(1)])
  })

  isLooping: boolean = false
  intervalId: any;

  toggleLoop() {
    if (this.isLooping) {
      this.stopLoop();
    } else {
      this.startLoop();
    }
    this.isLooping = !this.isLooping;
  }

  startLoop() {
    this.intervalId = setInterval(() => {
      this.gol.nextGeneration()
    }, this.form.get("time")!.value * 1000);
  }

  stopLoop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  constructor(public gol: GolService) {
    this.form.get("width")?.statusChanges.subscribe( status => {
      if (status == "VALID") {
        gol.setWidth(Number(this.form.get("width")!.value))
      }
    })

    this.form.get("height")?.statusChanges.subscribe( status => {
      if (status == "VALID") {
        gol.setHeight(Number(this.form.get("height")!.value))
      }
    })
  }
}
