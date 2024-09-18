import { Component } from '@angular/core';
import { ReactiveFormsModule,FormControl,FormGroup,FormBuilder,Validator, Validators,FormArray } from '@angular/forms';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formulario-reactivo',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './formulario-reactivo.component.html',
  styleUrl: './formulario-reactivo.component.scss'
})
export class FormularioReactivoComponent {
  pokemonsForm: FormGroup;
  pokemonTypes: string[] = [
    'Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego',
    'Hada', 'Hielo', 'Lucha', 'Normal', 'Planta', 'Psíquico', 'Roca',
    'Siniestro', 'Tierra', 'Veneno', 'Volador'
  ];

  constructor(private formBuilder: FormBuilder, private pokemonService: PokemonService) {
    this.pokemonsForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: [''],
      types: this.buildPokemonTypes() 
    });
  }
  buildPokemonTypes() {
    const arr = this.pokemonTypes.map(() => {
      return new FormControl(false); // Inicializa los checkboxes como no seleccionados
    });
    return new FormArray(arr);
  }

  guardar() {
    if (this.pokemonsForm.valid) {
      const selectedTypes = this.pokemonsForm.value.types
        .map((checked: boolean, index: number) => checked ? this.pokemonTypes[index] : null)
        .filter((value: string | null) => value !== null); // Filtra los tipos seleccionados

      const newPokemon: Pokemon = {
        ...this.pokemonsForm.value,
        type: selectedTypes 
      };

      this.pokemonService.addPokemon(newPokemon);
      this.pokemonsForm.reset();
    }
  }
}
