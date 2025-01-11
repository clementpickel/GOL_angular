import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GolService } from './service/gol.service';
import { CaseComponent } from './component/case/case.component';
import { ControlPanelComponent } from './component/control-panel/control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CaseComponent,
    ControlPanelComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GOL_angular';

  constructor(public gol: GolService) {}
}
