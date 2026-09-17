import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditHeroForm, Hero } from '../../shared/interfaces/hero.interface';
import { NO_EMPTY_REGEX } from '../../shared/patterns';
import { SuperHeros } from '../services/super-heros';

@Component({
  selector: 'app-edit-hero-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatLabel,
    MatError,
    CdkTextareaAutosize
  ],
  templateUrl: './edit-hero-dialog.html',
  styleUrl: './edit-hero-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditHeroDialog {
  readonly dialogRef = inject(MatDialogRef<EditHeroDialog>);
  private _superHeros = inject(SuperHeros);
  private _snackBar = inject(MatSnackBar);
  private data: Hero = inject(MAT_DIALOG_DATA);

  public isWorking = signal(false);
  public errorMessage = signal<string | null>(null);

  public heroForm = new FormGroup<EditHeroForm>({
    id: new FormControl(this.data.id, Validators.required),
    name: new FormControl(this.data.name,
      [
        Validators.required,
        Validators.pattern(NO_EMPTY_REGEX),
        Validators.maxLength(50)
      ]),
    comesFrom: new FormControl(this.data.comesFrom,
      [
        Validators.required,
        Validators.pattern(NO_EMPTY_REGEX),
        Validators.maxLength(50)
      ]
    ),
    power: new FormControl(this.data.power,
      [
        Validators.required,
        Validators.pattern(NO_EMPTY_REGEX),
        Validators.maxLength(200)
      ]
    ),
    realName: new FormControl(this.data.realName,
      [
        Validators.required,
        Validators.pattern(NO_EMPTY_REGEX),
        Validators.maxLength(50)
      ]
    ),
    universe: new FormControl(this.data.universe,
      [
        Validators.required,
        Validators.pattern(NO_EMPTY_REGEX),
        Validators.maxLength(50)
      ]
    ),
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
