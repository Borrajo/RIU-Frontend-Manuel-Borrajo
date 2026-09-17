import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Hero } from '../../shared/interfaces/hero.interface';
import { SUPER_HEROS_LIST } from './super-heros.list';

@Injectable({
  providedIn: 'root',
})
export class SuperHeros {
  private _superHeros: WritableSignal<readonly Hero[]> = signal(SUPER_HEROS_LIST);
  private _searchName: WritableSignal<string> = signal('');

  public superHeros: Signal<readonly Hero[]> = this._superHeros.asReadonly();

  public superHerosFiltered: Signal<Hero[]> = computed(() => {
    const searchTerm = this._searchName();
    return this.superHeros().filter((hero: Hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  public getSuperHeroById(id: Hero['id']): Hero | undefined {
    return this.superHeros().find((hero: Hero) => hero.id === id);
  };

  public searchSuperHerosByName(searchTerm: string): void {
    this._searchName.set(searchTerm);
  };

  public addSuperHero(hero: Hero): void {
    if (!hero || hero.name.trim() === '') {
      throw new Error('Hero name cannot be empty.');
    }

    const existingHero = this.superHeros().filter((h: Hero) => h.name.toLowerCase() === hero.name.toLowerCase());

    if (existingHero.length > 0) {
      throw new Error(`Hero with name "${hero.name}" already exists.`);
    }

    const newHero: Hero = { ...hero, id: crypto.randomUUID() };

    this._superHeros.update((h: readonly Hero[]) => [...h, newHero]);
  };

  public removeSuperHero(heroId: Hero['id']): void {
    this._superHeros.update((h: readonly Hero[]) => h.filter((h: Hero) =>
      h.id !== heroId
    ));
  };

  public updateSuperHero(hero: Hero): void {
    if (!hero.name || hero.name.trim() === '') {
      throw new Error('Hero name cannot be empty.');
    }
    const trimmedHero: Hero = {...hero, name: hero.name.trim()};
    this._superHeros.update((h: readonly Hero[]) => h.map((h: Hero) =>
      h.id === hero.id ? trimmedHero : h
    ));
  };

}
