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
  private urlMovie:String = "https://api.themoviedb.org/3/search/movie?";
  apiKey2 = "fd781264";
  url2 = 'http://www.omdbapi.com/';
  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=asas&page=1&include_adult=false

  private urlGame:String = "https://api.rawg.io/api/games?search="
  apikeyGame = "aeb5bcc347792c63b2c47b68701b5a38c515f904";
  urlGame2 = "https://www.giantbomb.com/api/search/?";
  
  constructor(private http:HttpClient) { }

  public get pelis(){
    var lista:Multimedia[] = [];
    for (let index = 0; index < 6; index++) {
      var temp = new Multimedia(index.toString(),index.toString());
      lista.push(temp);
    }
    return lista;
  }
  public get juegos() {
    var lista:Multimedia[] = [];
    for (let index = 0; index < 6; index++) {
      var temp = new Multimedia(index.toString(),index.toString());
      lista.push(temp);
    }
    return lista;
  }
  public searchMovie(title:string):Observable<any> {
    return this.http.get(this.urlMovie+"api_key="+this.apiKeyMovie+"&query="+encodeURI(title)+"&language=es&page=1").pipe(map(results => results["results"]));
  }
  public searchGame(title:string):Observable<any> {
    return this.http.get(this.urlGame2+"api_key="+this.apikeyGame+"&format=json&query="+encodeURI(title)+"&resources=game").pipe(map(results => results["results"]));
  }
}
