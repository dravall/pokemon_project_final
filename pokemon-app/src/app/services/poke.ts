import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';


interface PokemonListItem { name: string; url: string; }
interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

@Injectable({ providedIn: 'root' })
export class Poke {
  private http = inject(HttpClient);
  private base = 'https://pokeapi.co/api/v2';

  getPokemonPage(limit = 24, offset = 0) {
    return this.http.get<PokemonListResponse>(`${this.base}/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map(res => res.results.map(item => {
        // extract numeric id from the item.url
        const id = item.url.split('/').filter(Boolean).pop()!;
        // use the official artwork sprite (no extra API call needed)
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return { id: Number(id), name: item.name, image };
      })),
      catchError(err => throwError(() => new Error('Failed to fetch Pokémon list')))
    );
  }
  getAllPokemonNames(limit = 2000) {
  return this.http
    .get<{ results: { name: string; url: string }[] }>(`${this.base}/pokemon?limit=${limit}`)
    .pipe(map(res => res.results.map(r => r.name)));
}
getPokemonByNameOrId(nameOrId: string | number) {
  const key = String(nameOrId).toLowerCase().trim();
  return this.http.get<any>(`${this.base}/pokemon/${key}`).pipe(
    map(p => {
      const id = p.id;
      const image = p.sprites.other?.['official-artwork']?.front_default
        ?? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return { id, name: p.name, image };
    })
  );
}

}