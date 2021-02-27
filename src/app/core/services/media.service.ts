import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Multimedia } from '../model/Multimedia';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private apiKeyMovie:String = "4d9eb1e1a38c5254e6ae54d958c58a47";
  private urlMovie:String = "https://api.themoviedb.org/3/";
  
  apiKey2 = "fd781264";
  url2 = 'http://www.omdbapi.com/';

  private urlGame:String = "https://api.rawg.io/api/games?"
  
  constructor(private http:HttpClient) { }

  public searchMovie(title:string):Observable<any> {
    return this.http.get(this.urlMovie+"search/movie?api_key="+this.apiKeyMovie+"&query="+encodeURI(title)+"&language=es&page=1").pipe(map(results => results["results"]));
    // return this.http.get(this.url2+"?apikey="+this.apiKey2+"&s="+title).pipe(map(results=>results["Search"]));
  }
  public searchGame(title:string):Observable<any> {
    return this.http.get(this.urlGame+"search="+title).pipe(map(results=>results["results"]));
  }
  public getRandomMovies(genre:string):Observable<any> {
    return this.http.get(this.urlMovie+"discover/movie?api_key="+this.apiKeyMovie+"&with_genres="+genre).pipe(map(results => results["results"]));
  }
  public getRandomGames(genre:string) {
    return this.http.get(this.urlGame+"genres="+genre).pipe(map(results=>results["results"]));
  }
}
