import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuperHeros } from '../services/super-heros';
import { EditHeroForm, Hero } from '../interfaces/hero.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-hero-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-hero-dialog.html',
  styleUrl: './edit-hero-dialog.scss',
})
export class EditHeroDialog {
  readonly dialogRef = inject(MatDialogRef<EditHeroDialog>);
  private _superHeros = inject(SuperHeros);
  private _snackBar = inject(MatSnackBar);
  private data = inject(MAT_DIALOG_DATA);

  public isWorking = signal(false);
  public errorMessage = signal<string | null>(null);

  public heroForm = new FormGroup<EditHeroForm>({
    id: new FormControl(this.data.id, Validators.required),
    name: new FormControl(this.data.name,
      [
        Validators.required,
        Validators.pattern(/^(?!\s*$).+$/),
        Validators.maxLength(50)
      ]),
  });

  public onSubmit(): void {
    this.isWorking.set(true);
    try {
      this._superHeros.updateSuperHero(this.heroForm.value as Hero);
      this.dialogRef.close();
      this._snackBar.open('Hero updated successfully', 'Close');
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set('An unknown error occurred.');
      }
    }
    finally {
      this.isWorking.set(false);
    }
  }
}
