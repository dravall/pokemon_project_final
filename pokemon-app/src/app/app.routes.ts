import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Pokemon} from './pages/pokemon/pokemon';
import { ContactForm } from './pages/contact-form/contact-form';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'pokemon', component: Pokemon, title: 'Pokémon' },
  { path: 'contact', component: ContactForm, title: 'Contact' },
  { path: '**', redirectTo: '' }
];
