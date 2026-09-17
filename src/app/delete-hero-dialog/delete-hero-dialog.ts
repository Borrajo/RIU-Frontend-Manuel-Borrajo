import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../shared/interfaces/hero.interface';

@Component({
  selector: 'app-delete-hero-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatButton
  ],
  templateUrl: './delete-hero-dialog.html',
  styleUrl: './delete-hero-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteHeroDialog { 
    private data: Hero = inject(MAT_DIALOG_DATA);
    public hero: Signal<Hero> = signal(this.data);
}
