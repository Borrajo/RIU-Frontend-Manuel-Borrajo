import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { Heroslist } from "../heroslist/heroslist";
import { SearchBar } from '../search-bar/search-bar';
import { AddHeroButton } from "../add-hero-button/add-hero-button";

@Component({
  selector: 'app-main-page',
  imports: [Heroslist, SearchBar, AddHeroButton],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {}
