import { Component, inject, signal } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GiftList } from "../../components/gift-list/gift-list";

@Component({
  selector: 'app-search',
  imports: [
    GiftList
],
  templateUrl: './search.html',
  standalone: true,
})
export default class Search {

  giftService = inject(GifService);
  gif = signal<Gif[]>([]);


  onSearch(query:string) {
    
    this.giftService.searchGifs(query).subscribe((resp) => {
        this.gif.set(resp);
    })
  }

  
 }
