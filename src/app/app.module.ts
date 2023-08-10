import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PetTableComponent } from './components/pet-table/pet-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ResizableLayoutComponent } from './components/layouts/resizable-layout/resizable-layout.component';
import { AngularSplitModule } from 'angular-split';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PetTableComponent,
    ResizableLayoutComponent,
    PetDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSplitModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
