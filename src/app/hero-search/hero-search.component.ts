import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) {}
  search(term: string): void {
    this.searchTerms.next(term);
    // push a search term into the observable stream
    // a Subject is both a source of observale values and an Observable itself-you can subscribe
    // to a subject as you would any Observable
    // You can push values into that Observable by calling its next(value) method
  }
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // passing a new user search term directly to the searchHeroes() after every user 
      // keystroke creates a lot of HTTP requests which can be very taxing on the server 
      // resources and burn through data plans - ngOnInit() pips the searchTerms observable 
      // through a sequcne of RxJS operators that reduce the number of calls the searchHeroes() 
      // - this returns an observable in a timely hero search result where each one is a Hero[]
      debounceTime(300),
      // wait 300 ms after each keystrong before considering the term
      distinctUntilChanged(),
      // ignores new term if same as previous term
      switchMap((term: string) => this.heroService.searchHeroes(term))
      // switch to new search observable each time the term changes
      // with the switchMap operator, every qualifying key event can trigger an HttpCLient.get()
      // method call. Even with a 300 ms pause between requests, you could have many HTTP 
      // requests in flight and they may not return in the order sent. switchMap presevres the 
      // origianl request order while reutring only the observable from the most recent HTTP 
      // method call, results from prior calls are canceled and discarderded
    )
  }
}
