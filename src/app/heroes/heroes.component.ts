import { Component } from '@angular/core';
//always import component from @angular/core, gives the metedata properties:
//selector, templateUrl, and styleUrls
import { Hero } from '../hero'
//import the Hero interface

@Component({
  selector: 'app-heroes', //matches the name of the HTML element that identifies the componenet
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
//always export the component class, like in React, so you can import it elsewhere (AppModule)
//componenets hero property is type Hero, initialized with id of 1 and name Windstorm 
hero: Hero = {
  id: 1,
  name: 'Windstorm'
 }
}

