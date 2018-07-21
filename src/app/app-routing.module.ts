import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterGeneratorComponent } from './shared/character-generator/character-generator.component';
import { CharacterViewerComponent } from './shared/character-viewer/character-viewer.component';


const routes: Routes = [
  { path: '', redirectTo: '/viewcharacter', pathMatch: 'full' },
//  { path: 'dashboard', component: DashboardComponent },
//  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'newcharacter', component: CharacterGeneratorComponent },
  { path: 'viewcharacter', component: CharacterViewerComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
