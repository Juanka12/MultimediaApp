import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Multimedia } from '../model/Multimedia';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private apiMovieKey:String = "4d9eb1e1a38c5254e6ae54d958c58a47";
  private urlMovie:String = "https://api.themoviedb.org/3/";
  
  private apiMovieKey2:String = "fd781264";
  private urlMovie2:String = 'http://www.omdbapi.com/';

  private urlTrailer:String = "https://www.youtube.com/embed/";

  private urlGame:String = "https://api.rawg.io/api/games"
  
  constructor(private http:HttpClient) { }

  public searchMovie(title:string) {
    let movieList:Array<Multimedia> = new Array<Multimedia>();
    return new Promise((resolve,reject)=>{
      this.http.get(this.urlMovie2+"?apikey="+this.apiMovieKey2+"&s="+encodeURI(title)+"&type=movie").toPromise().then(res => {
        res["Search"].forEach(movie => {
          movieList.push(new Multimedia(movie["Poster"],"",movie["Title"],[],movie["imdbID"],0,"movie"));
        });
        resolve(movieList);
      },
      error=>{
        reject(error);
      })
    })
  }
  public searchGame(title:string) {
    let gameList:Array<Multimedia> = new Array<Multimedia>();
    return new Promise((resolve,reject)=>{
      this.http.get(this.urlGame+"?search="+encodeURI(title)).toPromise().then(res => {
        res["results"].forEach(game => {
          gameList.push(new Multimedia(game["background_image"],"",game["name"],game["genres"],game["id"],game["metacritic"],"game"));
        });
        resolve(gameList);
      },
      error=>{
        reject(error);
      })
    })
  }
  public getRandomMovies() {
    let movieList:Array<Multimedia> = new Array<Multimedia>();  
    return new Promise((resolve,reject)=>{
      this.http.get(this.urlMovie+"movie/popular?api_key="+this.apiMovieKey).toPromise().then(res => {
        res["results"].forEach(movie => {
          movieList.push(new Multimedia("https://image.tmdb.org/t/p/w500"+movie["poster_path"],movie["overview"],movie["title"],movie["genre_ids"],movie["id"],movie["vote_average"],"movie"));
        });
        resolve(movieList);
      },
      error=>{
        reject(error);
      })
    })
  }
  public getRandomGames() {
    let gameList:Array<Multimedia> = new Array<Multimedia>();
    return new Promise((resolve,reject)=>{
      this.http.get(this.urlGame.toString()).toPromise().then(response => {
        response["results"].forEach(game => {
          gameList.push(new Multimedia(game["background_image"],"",game["name"],game["genres"],game["id"],game["metacritic"],"game"))
        });
        resolve(gameList);
      },
        error=>{
          reject(error);
        })
    })  
  }
  public getMovieData(media:Multimedia) {
    return new Promise((resolve,reject) => {
      this.http.get(this.urlMovie+"movie/"+media.id+"?api_key="+this.apiMovieKey+"&language=es").subscribe(async response => {
        console.log(response);
        var mediaTemp = new Multimedia(media.src,response["overview"],response["title"],response["genres"],response["imdb_id"],response["vote_average"],"movie");
        let trailer = await this.getMovieTrailer(media.id);
        mediaTemp.date = response["release_date"];
        mediaTemp.trailer = trailer.toString();
        resolve(mediaTemp);
      },
        error=>{
          reject(error);
        });
    })
  }
  public getGameData(media:Multimedia){
    return new Promise((resolve,reject) => {
      this.http.get(this.urlGame+"/"+media.id).subscribe(response => {
        console.log(response);
        var mediaTemp = new Multimedia(media.src,response["description_raw"],response["name"],response["genres"],response["id"],Number(response["metacritic"])/10,"game");
        let trailer;
        if (response["clip"]==null) {
          trailer = null;
        }else{
          trailer = response["clip"]["clip"];
        }
        mediaTemp.trailer=trailer;
        resolve(mediaTemp);
      },
        error=>{
          reject(error);
        })
    })
  }
  public getMovieTrailer(id:string) {
    return new Promise((resolve,reject) => {
      this.http.get(this.urlMovie+"movie/"+id+"/videos?api_key="+this.apiMovieKey).subscribe(res => {
        let trailer;
        if (res["results"].length==0) {
          trailer = null;
        }else{
          trailer = this.urlTrailer+res["results"][0]["key"]+"?controls=0";
        }
        resolve(trailer);
      },
        error=>{
          reject(error);
        });
    });
  }
}
