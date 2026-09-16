import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Heroslist } from "../heroslist/heroslist";
import { SearchBar } from '../search-bar/search-bar';
import { AddHeroButton } from "../add-hero-button/add-hero-button";

@Component({
  selector: 'app-main-page',
  imports: [Heroslist, SearchBar, AddHeroButton],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPage {}
