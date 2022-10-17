import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonCompareComponent } from './pokemon-compare/pokemon-compare.component';
import { PokemonNavbarComponent } from './pokemon-navbar/pokemon-navbar.component';
import { RouterModule } from '@angular/router';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailsComponent,
    PokemonCompareComponent,
    PokemonNavbarComponent,
    PokemonTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'compare', component: PokemonCompareComponent },
      { path: 'details', component: PokemonDetailsComponent },
      { path: 'home', component: PokemonTableComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
