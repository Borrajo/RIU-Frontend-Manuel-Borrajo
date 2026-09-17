import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SuperHeros } from '../services/super-heros';

@Component({
  selector: 'app-search-bar',
  imports: [MatInput, MatFormField],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar { 

  private _superHeros: SuperHeros = inject(SuperHeros);

  public onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this._superHeros.searchSuperHerosByName(searchTerm);
  }

}
