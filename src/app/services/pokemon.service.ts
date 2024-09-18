import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonSubject = new BehaviorSubject<Pokemon[]>([]);
  pokemon$ = this.pokemonSubject.asObservable();

  constructor() {
    this.pokemonSubject.next([]);
  }
  addPokemon(pokemon: Pokemon) {
    const currentPokemons = this.pokemonSubject.getValue();
    this.pokemonSubject.next([...currentPokemons, pokemon]);
  }

  deletePokemon(id: number) {
    const currentPokemons = this.pokemonSubject.getValue();
    this.pokemonSubject.next(currentPokemons.filter(pokemon => pokemon.id !== id));
  }

}
