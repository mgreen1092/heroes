import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  heroes: Hero [] = []
  // defines a heroes array property 
  constructor (private heroService: HeroService) {}
  // constructor expects Angular to inject the HeroService into a private heroService property
  ngOnInit(): void {
    this.getHeroes()
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
      // returns the sliced list of heroes at positions 1 and 5, returning only Heroes two, 
      // three, four and five
  }
}
