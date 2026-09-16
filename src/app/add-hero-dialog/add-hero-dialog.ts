import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuperHeros } from '../services/super-heros';
import { NewHeroForm } from '../interfaces/hero.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-hero-dialog',
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
  templateUrl: './add-hero-dialog.html',
  styleUrl: './add-hero-dialog.scss',
})
export class AddHeroDialog {
  readonly dialogRef = inject(MatDialogRef<AddHeroDialog>);
  private _superHeros = inject(SuperHeros);
  private _snackBar = inject(MatSnackBar);

  public isWorking = signal(false);
  public errorMessage = signal<string | null>(null);

  public heroForm = new FormGroup<NewHeroForm>({
    name: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^(?!\s*$).+$/),
        Validators.maxLength(50)
      ]
    ),
  });

  public onSubmit(): void {
    this.isWorking.set(true);
    try {
      this._superHeros.addSuperHero(this.heroForm.value.name!.trim());
      this.dialogRef.close();
      this._snackBar.open('Hero added successfully', 'Close');
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
