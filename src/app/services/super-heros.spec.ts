import { TestBed } from '@angular/core/testing';

import { SuperHeros } from './super-heros';
import { Hero } from '../interfaces/hero.interface';

describe('SuperHeros', () => {
  let service: SuperHeros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeros);
  });

  it('should add a new hero when called with a non-existing hero', () => {
    const hero: Hero['name'] =  'Superman' ;

    service.addSuperHero(hero);
    service.searchSuperHerosByName(hero);
    
    expect(service.superHerosFiltered()[0].name).toEqual(hero);
  });

  it('should throw an error when adding a hero with an existing name', () => {
    const hero: Hero = { id: '1', name: 'Thor' };

    expect(() => service.addSuperHero('Thor'))
      .toThrow('Hero with name "Thor" already exists.');
  });

  it('should remove an existing hero', () => {
    const hero: Hero = { id: '3e2504e0-4f89-11d3-9a0c-0305e82c3301', name: 'Hulk' };
    const heroCount = service.superHeros().length;

    service.removeSuperHero(hero.id); 

    expect(service.superHeros().length).toBe(heroCount - 1);
  });

  it('should return undefined when trying to remove a non-existing hero', () => {
    const hero: Hero = { id: '3', name: 'Wonder Woman' };
    const heroCount = service.superHeros().length;

    service.removeSuperHero(hero.id);

    expect(service.superHeros().length).toBe(heroCount);
  });

  it('should update a hero', () => {
    const updatedHero: Hero = { id: 'c4a53232-15f2-4e8a-a681-7090b34336c2', name: 'Wolverine Updated' };

    service.updateSuperHero(updatedHero);

    expect(service.getSuperHeroById('c4a53232-15f2-4e8a-a681-7090b34336c2')).toEqual(updatedHero);
  }); 

  it('should return a hero by name', () => {
    const expectedHeroName = 'Iron Man';

    service.searchSuperHerosByName(expectedHeroName);

    expect(service.superHerosFiltered()[0].name).toBe(expectedHeroName);
  });

  it('should return an empty array for a non-existing hero name', () => {
    service.searchSuperHerosByName('Non-Existing Hero');

    expect(service.superHerosFiltered()).toEqual([]);
  });
});
