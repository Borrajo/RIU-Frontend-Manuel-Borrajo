import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { SUPER_HEROS_LIST } from './super-heros.list';

@Injectable({
  providedIn: 'root',
})
export class SuperHeros {
  private _superHeros: WritableSignal<readonly Hero[]> = signal(SUPER_HEROS_LIST);
  private _searchName: WritableSignal<string> = signal('');

  public superHeros: Signal<readonly Hero[]> = this._superHeros.asReadonly();

  public superHerosFiltered = computed(() => { 
    const searchTerm = this._searchName();
    return this.superHeros().filter((hero: Hero) => 
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); 
  });

  public getSuperHeroById(id: Hero['id']): Hero | undefined { 
    return this.superHeros().find((hero: Hero) => hero.id === id); 
  };

  public searchSuperHerosByName(searchTerm: string): void {
    console.log('Search term received in service:', searchTerm);
    this._searchName.set(searchTerm);
  };

  public addSuperHero(heroName: Hero['name']): void { 
    if(!heroName || heroName.trim() === '') {
      throw new Error('Hero name cannot be empty.');
    }

    const existingHero = this.superHeros().filter((h: Hero) => h.name.toLowerCase() === heroName.toLowerCase());
   
    if (existingHero.length > 0) {
      throw new Error(`Hero with name "${heroName}" already exists.`);
    }
    
    this._superHeros.update((h: readonly Hero[]) => [...h, { name: heroName, id: crypto.randomUUID() }]); 
  };

  public removeSuperHero(heroId: Hero['id']): void {
    this._superHeros.update((h: readonly Hero[]) => h.filter((h: Hero) => 
      h.id !== heroId
    )); 
  };

  public updateSuperHero(hero: Hero): void { 
    this._superHeros.update((h: readonly Hero[]) => h.map((h: Hero) => 
      h.id === hero.id ? { id: hero.id, name: hero.name.trim() } : h
    )); 
  };

}
