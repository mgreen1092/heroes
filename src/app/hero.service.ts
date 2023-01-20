import { Injectable } from '@angular/core';
// ng generate service hero geenrates a skeleton HeroService class
import {Hero} from './hero'
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs';

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
  private heroesUrl = 'api/heroes'
  // URL to web API
  getHeroes(): Observable<Hero[]> {
    // Observable is one of the key classes in the RxJS library
    // const heroes = of(HEROES)
    // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock 
    // heroes
    // this.messageService.add('HeroService: fetched heroes') removed when changed to logging it
    // sends a message when the heroes are fetched
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
      // catchError() intercepts an Observable that failed - the operator then passes the erorr 
      // to the error handling function
      // handleError reports the error and then returns an innocuous result so that the 
      // application keeps working
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    // handleError takes a type parameter to return the safe value as the type that the application expects
    return (error: any): Observable<T> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
  constructor(
    private http: HttpClient, 
    // private messageService: MessageService,
    private messageService: MessageService) { 
    // example of typical service-in-service scenario in which you inject the Message Service into the HeroService which is injected into HeroesComponent
  }
  getHero(id: number): Observable<Hero> {
    // returns a mock hero as an Observable RxJS of() function
    // assuming that a hero with the specified ID always exists
    const hero = HEROES.find(h => h.id === id)!
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return of(hero)
  }
}
