import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, Signal, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Hero } from '../../shared/interfaces/hero.interface';
import { DeleteHeroDialog } from '../delete-hero-dialog/delete-hero-dialog';
import { EditHeroDialog } from '../edit-hero-dialog/edit-hero-dialog';
import { SuperHeros } from '../services/super-heros';

@Component({
  selector: 'app-heroslist',
  imports: [
    MatPaginator,
    MatMenu,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardContent,
    MatTableModule,
    MatMenuTrigger,
    MatMenuItem,
  ],
  templateUrl: './heroslist.html',
  styleUrl: './heroslist.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Heroslist {


  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private _superHeros: SuperHeros = inject(SuperHeros);
  public superHerosList = this._superHeros.superHerosFiltered;

  public pageSize = signal(10);
  public pageIndex = linkedSignal({
    source: this.superHerosList, 
    computation: () => 0 
  });

  public superHerosPaginated: Signal<Hero[]> = computed<Hero[]>(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.superHerosList().slice(startIndex, startIndex + this.pageSize());
  });

  public superHerosQty = computed(() => this.superHerosList().length);

  public dataSource = this.superHerosPaginated;

  public displayedColumns: string[] = ['position', 'name', 'comesfrom', 'universe', 'actions'];

  public onPageEvent(e: PageEvent): void {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }

  public onEditHero(heroId: string): void {
    this.dialog.open(EditHeroDialog, {
      width: '400px',
      data: this._superHeros.getSuperHeroById(heroId)
    });
  }

  public onDeleteHero(heroId: string): void {
    const dialogRef = this.dialog.open(DeleteHeroDialog, {
      data: this._superHeros.getSuperHeroById(heroId)
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._superHeros.removeSuperHero(heroId);
        this._snackBar.open('Hero deleted successfully', 'Close');
      }
    });
  }
}
