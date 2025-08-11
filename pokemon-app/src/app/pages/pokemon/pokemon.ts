import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Poke } from '../../services/poke';

type Card = { id: number; name: string; image: string };

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.html',
  styleUrls: ['./pokemon.scss']
})
export class Pokemon {
  private api = inject(Poke);

  list: Card[] = [];
  loading = true;
  error = '';

  // simple pagination
  limit = 24;     // items per page
  page = 0;       // 0-based
  get offset() { return this.page * this.limit; }

  ngOnInit() {
    this.loadPage(0);
  }

  loadPage(p: number) {
    this.loading = true;
    this.error = '';
    this.page = Math.max(0, p);
    this.api.getPokemonPage(this.limit, this.offset).subscribe({
      next: data => { this.list = data; this.loading = false; },
      error: e => { this.error = 'Failed to load Pokémon.'; this.loading = false; console.error(e); }
    });
  }

  prevPage() { if (this.page > 0) this.loadPage(this.page - 1); }
  nextPage() { this.loadPage(this.page + 1); }
}
