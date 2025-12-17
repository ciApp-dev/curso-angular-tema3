import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type{ GiphyResponse } from '../interfaces/giphy.interfaces';
import type{ Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../components/mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


const GIF_KEY = 'gif';

const loadFromLocalStorage = () => {
    const gifFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifFromLocalStorage);
    return gifs;
}


@Injectable({providedIn: 'root'})
export class GifService {
    private http = inject(HttpClient);

    trendingGif = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    
    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
    /*searchHistory = signal<Record<string, Gif[]>>(JSON.parse(localStorage.getItem('searchHistory') ?? '{}'));
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
    */
    constructor(){
        this.loadTrendingGifs();
    }

    saveGifToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY, historyString);
    });
    

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

    searchGifs(query: string):Observable<Gif[]> {
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params: {
                api_key: environment.giphyApiKey,
                limit: '25',
                q: query,
            }
        }).pipe(
           map(({data}) => data),
            map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        
            //TODO: History service
            tap(items =>{
                this.searchHistory.update(history =>({
                    ...history,
                    [query.toLowerCase()]: items
                }))
                //localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
            })
        );
        
        /*
        .subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            console.log({gifs});
        })*/
           
    }

    getHistoryGifs(query: string):Gif[]{
        return this.searchHistory()[query]?? [];
    }
}