import { Component } from '@angular/core';
import { MediaService } from '../core/services/media.service';
import { Multimedia } from '../core/model/Multimedia';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private _searchResultMovies;
  private _searchResultGames;

  private _loadedGames:boolean = false;
  private _loadedMovies:boolean = false;

  constructor(private mediaService: MediaService, private router: Router) {
    this.mediaService.getRandomMovies("27").then((res)=>{
      this._searchResultMovies = res;
      this._loadedMovies=true;
    });
    this.mediaService.getRandomGames("4").then((res)=>{
      this._searchResultGames = res;
      this._loadedGames=true;
    });
  }

  public pasarItem(media:Multimedia) {
    console.log(media);
    var promesa = null;
    if (media.type=="movie") {
      promesa = this.mediaService.getMovieData(media);
    }else{
      promesa = this.mediaService.getGameData(media);
    }
    
    let navigationExtras: NavigationExtras = {
      state: {
        pasarMedia: promesa,
      },
    };
    this.router.navigate(['media-details'], navigationExtras);
  }
  public search(toSearch){
    this._loadedGames=false;
    this._loadedMovies=false;
    this.mediaService.searchMovie(toSearch).then((res)=>{
      this._searchResultMovies = res;
      this._loadedMovies=true;
    });
    this.mediaService.searchGame(toSearch).then((res)=>{
      this._searchResultGames = res;
      this._loadedGames=true;
    });
  }
  public onCancel(){
    this.mediaService.getRandomMovies("27").then((res)=>{
      this._searchResultMovies = res;
      this._loadedMovies=true;
    });
    this.mediaService.getRandomGames("4").then((res)=>{
      this._searchResultGames = res;
      this._loadedGames=true;
    });
  }

  public get searchResultMovies(){
    return this._searchResultMovies;
  }
  public get searchResultGames(){
    return this._searchResultGames;
  }
  public get loadedMovies(){
    return this._loadedMovies;
  }
  public get loadedGames(){
    return this._loadedGames;
  }
}
