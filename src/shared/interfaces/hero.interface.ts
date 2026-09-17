import { FormControl } from "@angular/forms";

export interface Hero {
  id: string;
  name: string;
  realName: string;
  power: string;
  universe: string;
  comesFrom: string;
}

export type NewHeroForm = {
  [K in Exclude<keyof Hero, 'id'>]: FormControl<Hero[K] | null>;
};

export type EditHeroForm = {
  [K in keyof Hero]: FormControl<Hero[K] | null>;
};