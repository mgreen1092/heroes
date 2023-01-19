import { Component } from '@angular/core';
//always import component from @angular/core, gives the metedata properties:
//selector, templateUrl, and styleUrls
import { Hero } from '../hero'
//import the Hero interface
// import {HEROES} from '../mock-heroes' this got deleted because of HeroService
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes', //matches the name of the HTML element that identifies the componenet
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
//always export the component class, like in React, so you can import it elsewhere (AppModule)
//componenets hero property is type Hero, initialized with id of 1 and name Windstorm 
// hero: Hero = {
//   id: 1,
//   name: 'Windstorm'
//  }
  heroes: Hero [] = []
  contructor(private heroService: HeroService) {}
  // defines a private heroService property and identifies it as a HeroService injection site
  getHeroes(): void {
    // this.heroes= this.heroService.getHeroes() --> removed after adding observables
    // retrieved heroes from the service 
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
      // subscribe method passes the emitted array to the callback, which sets the component's 
      // heroes propert. This asynchronous approach works when the HeroService requests heroes 
      // from the server
  }
  ngOnInit(): void {
    this.getHeroes()
  }
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    // assigns the clicked hero from the template to the component's selectedHero
  }
}

