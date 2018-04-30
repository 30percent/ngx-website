import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//non-angular imports
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './services/message.service';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { SongsService } from './services/songs.service';
import { MusicPlayingComponent } from './music-playing/music-playing.component';
import { MusicHeaderComponent } from './music-header/music-header.component';
import { CajaTestComponent } from './caja-test/caja-test.component';
import { SafeEvalComponent } from './examples/safe-eval/safe-eval.component';
import { JsonEditorComponent } from './examples/json-editor/json-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MusicPlayerComponent,
    MusicPlayingComponent,
    MusicHeaderComponent,
    CajaTestComponent,
    SafeEvalComponent,
    JsonEditorComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
    CustomMaterialModule,
    AppRoutingModule
  ],
  providers: [
    SongsService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
