import { Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddHeroDialog } from '../add-hero-dialog/add-hero-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-hero-button',
  imports: [ MatIconModule, MatButtonModule, MatTooltipModule ],
  templateUrl: './add-hero-button.html',
  styleUrl: './add-hero-button.scss',
})

export class AddHeroButton {

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(AddHeroDialog, {
      width: '250px',
    });
  }

}
