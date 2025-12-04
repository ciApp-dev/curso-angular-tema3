import { ChangeDetectionStrategy, Component, input} from '@angular/core';
import { GiftListItem } from './gift-list-item/gift-list-item';
import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-gift-list',
  imports: [GiftListItem],
  templateUrl: './gift-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftList { 

  inputImageUrls = input.required<Gif[]>();
}
