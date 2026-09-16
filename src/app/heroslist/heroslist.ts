import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SuperHeros } from '../services/super-heros';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DeleteHeroDialog } from '../delete-hero-dialog/delete-hero-dialog';
import { EditHeroDialog } from '../edit-hero-dialog/edit-hero-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-heroslist',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './heroslist.html',
  styleUrl: './heroslist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Heroslist {

  public pageSize = signal(10);
  public pageIndex = signal(0);
  public pageEvent = signal<PageEvent | undefined>(undefined);

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private _superHeros: SuperHeros = inject(SuperHeros);
  public superHerosList = this._superHeros.superHerosFiltered;

  public superHerosPaginated = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.superHerosList().slice(startIndex, startIndex + this.pageSize());
  });

  public superHerosQty = computed(() => this.superHerosList().length);

  public dataSource = this.superHerosPaginated;

  public displayedColumns: string[] = ['position', 'name', 'actions'];

  public onPageEvent(e: PageEvent): void {
    this.pageEvent.set(e);
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }

  public onEditHero(heroId: string): void {
   this.dialog.open(EditHeroDialog, {
      data: this._superHeros.getSuperHeroById(heroId)
    });
  }

  public onDeleteHero(heroId: string): void {
    const dialogRef = this.dialog.open(DeleteHeroDialog);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._superHeros.removeSuperHero(heroId);
        this._snackBar.open('Hero deleted successfully', 'Close');
      }
    });
  }
}
