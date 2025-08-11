import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Poke } from '../../services/poke';

type Fav = { trainer: string; pokemon: string; reason?: string; date: string };

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss']
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private api = inject(Poke);

  names: string[] = [];
  loading = true;
  error = '';

  form = this.fb.group({
    trainer: ['', [Validators.required, Validators.minLength(2)]],
    pokemon: ['', [Validators.required]],
    reason: ['']
  });

  favs: Fav[] = [];

  ngOnInit() {
    this.api.getAllPokemonNames().subscribe({
      next: n => { this.names = n; this.loading = false; },
      error: e => { this.error = 'Failed to load Pokémon names'; this.loading = false; console.error(e); }
    });
    this.loadFavs();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) return;
    const v = this.form.value;
    const fav: Fav = {
      trainer: v.trainer ?? '',
      pokemon: (v.pokemon ?? '').toLowerCase(),
      reason: v.reason ?? '',
      date: new Date().toISOString()
    };
    this.favs.unshift(fav);
    localStorage.setItem('fav-pokemon', JSON.stringify(this.favs));
    this.form.reset();
  }

  removeFav(i: number) {
    this.favs.splice(i, 1);
    localStorage.setItem('fav-pokemon', JSON.stringify(this.favs));
  }

  private loadFavs() {
    try {
      const raw = localStorage.getItem('fav-pokemon');
      this.favs = raw ? JSON.parse(raw) : [];
    } catch { this.favs = []; }
  }
}
