import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { SUPER_HEROS_LIST } from './super-heros.list';

@Injectable({
  providedIn: 'root',
})
export class SuperHeros {
  private _superHeros: WritableSignal<readonly Hero[]> = signal(SUPER_HEROS_LIST);
  private _searchTerm: WritableSignal<string> = signal('');

  public superHeros: Signal<readonly Hero[]> = this._superHeros.asReadonly();

  public getSuperHeroById(id: Hero['id']): Hero | undefined { 
    return this.superHeros().find((hero: Hero) => hero.id === id); 
  };

  public searchSuperHerosByName(searchTerm: string): void {
    this._searchTerm.set(searchTerm);
  };

  public superHerosFiltered = computed(() => { 
    return this.superHeros().filter((hero: Hero) => 
      hero.name.toLowerCase().includes(this._searchTerm().toLowerCase())
    ); 
  });

  public addSuperHero(hero: Hero): void { 
    const existingHero = this.superHeros().filter((h: Hero) => h.name.toLowerCase() === hero.name.toLowerCase());
    if (existingHero.length > 0) {
      throw new Error(`Hero with name "${hero.name}" already exists.`);
    }
    this._superHeros.update((h: readonly Hero[]) => [...h, hero]); 
  };

  public removeSuperHero(hero: Hero): void {
    this._superHeros.update((h: readonly Hero[]) => h.filter((h: Hero) => 
      h.id !== hero.id
    )); 
  };

  public updateSuperHero(hero: Hero): void { 
    this._superHeros.update((h: readonly Hero[]) => h.map((h: Hero) => 
      h.id === hero.id ? hero : h
    )); 
  };

}
