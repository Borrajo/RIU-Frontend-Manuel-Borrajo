import { FormControl } from "@angular/forms";

export interface Hero {
  id: string;
  name: string;
}

export type HeroForm = {
  [K in Exclude<keyof Hero, 'id'>]: FormControl<Hero[K] | null>;
};