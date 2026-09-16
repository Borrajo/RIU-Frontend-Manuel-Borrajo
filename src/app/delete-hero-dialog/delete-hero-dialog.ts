import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-hero-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatButtonModule
  ],
  templateUrl: './delete-hero-dialog.html',
  styleUrl: './delete-hero-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteHeroDialog { }
