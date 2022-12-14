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
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { ColorDirective } from '../directives/color.directive';
import { PokemonCompareGuard } from './pokemon-compare/pokemon-compare.guard';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailsComponent,
    PokemonCompareComponent,
    PokemonNavbarComponent,
    PokemonTableComponent,
    ColorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatPaginatorModule,
    FormsModule,
    TableModule,
    MatTableModule,
    HttpClientModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    ButtonModule,
    ImageModule,
    DialogModule,
    CheckboxModule,
    ContextMenuModule,
    MultiSelectModule,
    SliderModule,
    CalendarModule,
    ToastModule,
    RouterModule.forRoot([
      {
        path: 'compare',
        component: PokemonCompareComponent,
        canActivate: [PokemonCompareGuard],
      },
      { path: 'details/:id', component: PokemonDetailsComponent },
      { path: 'home', component: PokemonTableComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
