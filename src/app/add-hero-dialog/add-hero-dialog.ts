import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuperHeros } from '../services/super-heros';
import { HeroForm } from '../interfaces/hero.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    
    public isWorking = signal(false);
    public errorMessage = signal<string | null>(null);

    public heroForm = new FormGroup<HeroForm>({
        name: new FormControl('', Validators.required),
    }); 

    public onSubmit(): void {
      this.isWorking.set(true);
        try{
          console.log('Adding hero with name:', this.heroForm.value.name);
          this._superHeros.addSuperHero(this.heroForm.value.name!);
          this.dialogRef.close();
        }
        catch(error: unknown){
          if (error instanceof Error) {
            this.errorMessage.set(error.message);
          } else {
            this.errorMessage.set('An unknown error occurred.');
          }
        }
        finally{
          this.isWorking.set(false);
        }
      }
}
