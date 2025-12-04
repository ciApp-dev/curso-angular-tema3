import { Component, inject } from '@angular/core';
import { GiftList } from "../../components/gift-list/gift-list";
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search',
  imports: [GiftList
  ],
  templateUrl: './search.html',
  standalone: true,
})
export default class Search {

  giftService = inject(GifService);
  onSearch(query:string) {
    console.log({query});
  }
 }
