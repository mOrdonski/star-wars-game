import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-game-select',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './game-select.component.html',
  styleUrls: ['./game-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSelectComponent {}
