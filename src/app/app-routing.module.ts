import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//enables routing capacity
import { HeroesComponent } from './heroes/heroes.component';
// gives the router somewhere to go once you configure the routes

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent}
  // an angular route has two properties, a path (string that matches the URL in the browser 
  // address) and a component (what the router should create when navigating to this route)
];

@NgModule({
  // intiializes the router and starts it listening for browser location changes 
  imports: [RouterModule.forRoot(routes)], 
  // adds the routerModule to the AppRoutingModule imports array and configures it with the 
  // routes in one step by calling RouterModule.forRoot()
  // forRoot() provides to routing direction and does the initial navigation based on the 
  // current browser URL
  exports: [RouterModule]
  // allows RouterModule to be available throughout the entire application
})
export class AppRoutingModule { }
