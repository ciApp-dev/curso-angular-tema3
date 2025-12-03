import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type{ GiphyResponse } from '../interfaces/giphy.interfaces';
import type{ Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../components/mapper/gif.mapper';

@Injectable({providedIn: 'root'})
export class GifService {
    private http = inject(HttpClient);

    private trendingGif = signal<Gif[]>([]);
    constructor(){
        this.loadTrendingGifs();
    }

    loadTrendingGifs() {
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
            params: {
                api_key: environment.giphyApiKey,
                limit: '25',
            }
        }).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            console.log({gifs});
            
        })
    }
}