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

  private urlGame:String = "https://api.rawg.io/api/games"
  
  constructor(private http:HttpClient) { }

  public searchMovie(title:string) {
    let movieList:Array<Multimedia> = new Array<Multimedia>();
    let a = this.http.get(this.url2+"?apikey="+this.apiKey2+"&s="+encodeURI(title)+"&type=movie").pipe(map(results=>results["Search"]));
    a.subscribe({
      next(x){
        for (let index = 0; index < x.length; index++) {
          let movie = x[index];
          movieList.push(new Multimedia(movie["Poster"],"",movie["Title"],[],movie["imdbID"],"","movie"));
        }
      }
    })
    return movieList;
  }
  public searchGame(title:string) {
    let gameList:Array<Multimedia> = new Array<Multimedia>();
    let a = this.http.get(this.urlGame+"?search="+encodeURI(title)).pipe(map(results=>results["results"]));
    a.subscribe({
      next(x){
        for (let index = 0; index < x.length; index++) {
          let game = x[index];
          gameList.push(new Multimedia(game["background_image"],"",game["name"],game["genres"],game["id"],game["metacritic"],"game"));
        }
      }
    })
    return gameList;
  }
  public getRandomMovies(genre:string) {
    let movieList:Array<Multimedia> = new Array<Multimedia>();
    let a = this.http.get(this.urlMovie+"discover/movie?api_key="+this.apiKeyMovie+"&with_genres="+genre).pipe(map(results => results["results"]));
    a.subscribe({
      next(x){
        for (let index = 0; index < x.length; index++) {
          let movie = x[index];
          movieList.push(new Multimedia("https://image.tmdb.org/t/p/w500"+movie["poster_path"],movie["overview"],movie["title"],movie["genre_ids"],movie["id"],movie["vote_average"],"movie"));
        }
      }
    })
    return movieList;
  }
  public getRandomGames(genre:string) {
    let gameList:Array<Multimedia> = new Array<Multimedia>();
    let a = this.http.get(this.urlGame+"?genres="+genre).pipe(map(results=>results["results"]));
    a.subscribe({
      next(x){
        for (let index = 0; index < x.length; index++) {
          let game = x[index];
          gameList.push(new Multimedia(game["background_image"],"",game["name"],game["genres"],game["id"],game["metacritic"],"game"));
        }
      }
    })
    return gameList;
  }
  public getMovieData(media:Multimedia) {
    return new Promise((resolve,reject) => {
      this.http.get(this.urlMovie+"movie/"+media.id+"?api_key="+this.apiKeyMovie+"&language=es").subscribe(async response => {
        console.log(response);
        var mediaTemp = new Multimedia(media.src,response["overview"],response["title"],response["genres"],response["imdb_id"],response["vote_average"],media.type);
        let trailer = await this.getMovieTrailer(media.id);
        mediaTemp.trailer = trailer;
        resolve(mediaTemp);
      });
    })
  }
  public getGameData(media:Multimedia){
    return new Promise((resolve,reject) => {
      this.http.get(this.urlGame+"/"+media.id).subscribe(async response => {
        console.log(response);
        var mediaTemp = new Multimedia(media.src,response["description_raw"],response["name"],response["genres"],response["id"],response["metacritic"],"game");
        let trailer = response["clip"]["clip"];
        mediaTemp.trailer=trailer;
        resolve(mediaTemp)
      })
    })
  }
  public getMovieTrailer(id:string) {
    return new Promise((resolve,reject) => {
      this.http.get(this.urlMovie+"movie/"+id+"/videos?api_key="+this.apiKeyMovie).subscribe(res => {
        let trailer = "https://www.youtube.com/watch?v="+res["results"][0]["key"];
        resolve(trailer);
      });
    });
  }
}
