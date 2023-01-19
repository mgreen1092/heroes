import { Injectable } from '@angular/core';
// ng generate service hero geenrates a skeleton HeroService class
import {Hero} from './hero'
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';

@Injectable({
  // the inject is the object that chooses and injects the provider where the application 
  // requires it
  providedIn: 'root'
  // when you provide the service at the root lebel, Angular creates a signle, shared instance 
  // of HeroService and injects into any class that asks for it. Registering the provider in 
  // the @Injectable metadata also allows Angular to optimize an application by removing the 
  // service if it isnt used
})
// HeroService class is going to provide an injectable service and it can also have its own
// injected dependencies 
// @Injectable accepts metadata object for the service, the same way the @Component decorator did
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    // Observable is one of the key classes in the RxJS library
    const heroes = of(HEROES)
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock 
    // heroes
    return heroes
  }
  constructor() { 
  }
}
