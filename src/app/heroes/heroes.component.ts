import { Component, OnInit } from '@angular/core';
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
export class HeroesComponent implements OnInit{
//always export the component class, like in React, so you can import it elsewhere (AppModule)
//componenets hero property is type Hero, initialized with id of 1 and name Windstorm 
// hero: Hero = {
//   id: 1,
//   name: 'Windstorm'
//  }
  selectedHero?: Hero;
  heroes: Hero [] = []
  constructor(private heroService: HeroService) {}
  // defines a private heroService property and identifies it as a HeroService injection site
  // removed private messageService: MessageService after adjusting for routes
  getHeroes(): void {
    // this.heroes= this.heroService.getHeroes() --> removed after adding observables
    // retrieved heroes from the service 
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
      // subscribe method passes the emitted array to the callback, which sets the component's 
      // heroes property. This asynchronous approach works when the HeroService requests heroes 
      // from the server
  }
  ngOnInit(): void {
    this.getHeroes()
  }
  add(name: string): void {
    name=name.trim();
    if(!name) { return }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero)
    })
    // when the guven name isnt blank, the handler creates an object based on the hero's name. The handler passes the object name to the service's addHero() method
    // when addHero() creates a new object, the subscribe() callback recived the new hero and pushes it into the heroes list for display
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
    // assigns the clicked hero from the template to the component's selectedHero
    // this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
    // removed after adding routes
  // }
}

