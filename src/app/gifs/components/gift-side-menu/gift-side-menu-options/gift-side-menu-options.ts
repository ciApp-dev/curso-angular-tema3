import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

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
