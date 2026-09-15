import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuperHeros } from '../services/super-heros';

@Component({
  selector: 'app-search-bar',
  imports: [MatInputModule, MatFormFieldModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar { 

  private _superHeros: SuperHeros = inject(SuperHeros);

  public onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this._superHeros.searchSuperHerosByName(searchTerm);
  }

}
