import { Component, computed, inject, signal } from '@angular/core';
import { SuperHeros } from '../services/super-heros';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
})
export class Heroslist {

  public pageSize = signal(10);
  public pageIndex = signal(0);
  public pageEvent = signal<PageEvent | undefined>(undefined);

  private _superHeros: SuperHeros = inject(SuperHeros);
  public superHerosList = this._superHeros.superHerosFiltered;

  public superHerosPaginated = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.superHerosList().slice(startIndex, startIndex + this.pageSize());
  });

  public superHerosQty = computed(() => this.superHerosList().length);

  public dataSource = this.superHerosPaginated;

  public displayedColumns: string[] = ['position', 'name', 'actions'];

  public onPageEvent(e: PageEvent) {
    this.pageEvent.set(e);
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }

  public onEditHero(heroId: string) {
    console.log('Edit hero with ID:', heroId);
  }

  public onDeleteHero(heroId: string) {
      this._superHeros.removeSuperHero(heroId);
  }

}
