import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption{
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}
@Component({
  selector: 'app-gift-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gift-side-menu-options.html',
  
})
export class GiftSideMenuOptions { 

  gifService = inject(GifService);

menuOptions: MenuOption[] = [
{
  icon: 'fa-solid fa-chart-line',
  label: 'Trending',
  subLabel: 'Gifs Populares',
  route: '/dashboard/trending'
},
{
  icon: 'fa-solid fa-magnifying-glass',
  label: 'Buscador',
  subLabel: 'Buscar gifs',
  route: '/dashboard/search'
},
]



}
