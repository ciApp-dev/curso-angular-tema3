import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type{ GiphyResponse } from '../interfaces/giphy.interfaces';
import type{ Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../components/mapper/gif.mapper';

@Injectable({providedIn: 'root'})
export class GifService {
    private http = inject(HttpClient);

    trendingGif = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

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
            this.trendingGif.set(gifs);
            console.log({gifs});
            this.trendingGifsLoading.set(false);
        })
    }

    searchGifs(query: string) {
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params: {
                api_key: environment.giphyApiKey,
                limit: '25',
                q: query,
            }
        }).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            console.log({gifs});
        })
    }
}