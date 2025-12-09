import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GiftSideMenuHeader } from "./gift-side-menu-header/gift-side-menu-header";
import { GiftSideMenuOptions } from "./gift-side-menu-options/gift-side-menu-options";
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-gift-side-menu',
  imports: [GiftSideMenuHeader, GiftSideMenuOptions],
  templateUrl: './gift-side-menu.html',
})
export class GiftSideMenu { 
 
  
}
