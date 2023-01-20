import { Component, Input } from '@angular/core';
import {Hero} from '../hero'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  constructor (
    private route: ActivatedRoute,
    // holds information about the route to this instance of HeroDetailComponent, intersted in 
    // the parameters from the URL (:id)
    private heroService: HeroService,
    // gets the Hero data from the remote server and this component uses it to get the hero to 
    // display
    private location: Location
    // location is an Angular service allowing usrs to go back to the previous view 
  ) {}
  ngOnInit(): void {
    this.getHero()
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    // route.snapshot is a static image of the route information shortly after the component 
    // was created
    // paramMap is a dictionary of route paramter values extracted from the URL - the 'id' key 
    // returns the id of the hero to fetch
    // the JS Number fucntion converst the string to a number (since route parameters are always
    //  strings)
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero)
  }
  goBack(): void {
    this.location.back()
  }
  save(): void {
    if(this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
      // allows for hero name changes using the heroService updateHero
    }
  }
}
