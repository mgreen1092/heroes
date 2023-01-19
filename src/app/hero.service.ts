import { Injectable } from '@angular/core';
// ng generate service hero geenrates a skeleton HeroService class
import {Hero} from './hero'
import { HEROES } from './mock-heroes';
@Injectable({
  providedIn: 'root'
})
// HeroService class is going to provide an injectable service and it can also have its own
// injected dependencies 
// @Injectable accepts metadata object for the service, the same way the @Component decorator did
export class HeroService {
  getHeroes(): Hero[] {
    return HEROES
  }
  constructor() { 
  }
}
