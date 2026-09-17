import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFabButton } from "@angular/material/button";
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AddHeroDialog } from '../add-hero-dialog/add-hero-dialog';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-hero-button',
  imports: [ MatIcon, MatFabButton, MatTooltip ],
  templateUrl: './add-hero-button.html',
  styleUrl: './add-hero-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddHeroButton {

  readonly dialog = inject(MatDialog);

  public openDialog(): void {
    this.dialog.open(AddHeroDialog, {
      width: '400px',
    });
  }

}
