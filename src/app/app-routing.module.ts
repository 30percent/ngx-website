import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicPlayerComponent } from './music-player/music-player.component';


const routes: Routes = [
  { path: 'playlist', component: MusicPlayerComponent},
  { path: '', redirectTo: 'playlist', pathMatch: 'full'}
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  // declarations: [] //nothing is declared in routers
})
export class AppRoutingModule { }
