import { Component, inject,OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from '../../models/pokemon';
import { FormularioReactivoComponent } from '../../shared/formulario-reactivo/formulario-reactivo.component';
import { PokemonService } from '../../services/pokemon.service';
@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormularioReactivoComponent
]
})
export class MainSectionComponent implements OnInit{
  pokemonArray: Pokemon[] = [];

  constructor(
    private pokemonService: PokemonService,
  ) {}
  
  ngOnInit(): void {
    this.pokemonService.pokemon$.subscribe(pokemons => {
      this.pokemonArray = pokemons;
    });
  }

  showName(pokemon:Pokemon) {
    alert(`Description: ${pokemon.description}\nCategory: ${pokemon.category}\ntipo: ${pokemon.type}`);
  }
  deletepokemon(id: number) {
    this.pokemonService.deletePokemon(id);
    this.pokemonArray = this.pokemonArray.filter(pokemon => pokemon.id !== id);
  }

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 }
      ];
    })
  );
}
