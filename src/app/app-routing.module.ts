import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { CajaTestComponent } from './caja-test/caja-test.component';
import { SafeEvalComponent } from './examples/safe-eval/safe-eval.component';
import { JsonEditorComponent } from './examples/json-editor/json-editor.component';


const routes: Routes = [
  { path: 'album/:name', component: MusicPlayerComponent},
  { path: 'bits/safe-eval', component: SafeEvalComponent},
  { path: 'bits/json-editor', component: JsonEditorComponent},
  { path: '', redirectTo: 'bits/safe-eval', pathMatch: 'full'},
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
