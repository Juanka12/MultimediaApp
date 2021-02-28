import { Component } from '@angular/core';
import { MediaService } from '../core/services/media.service';
import { Multimedia } from '../core/model/Multimedia';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private searchResultMovies;
  private searchResultGames;

  constructor(private mediaService: MediaService, private router: Router) {
    this.searchResultMovies = this.mediaService.getRandomMovies("27");
    this.searchResultGames = this.mediaService.getRandomGames("4");
  }

  public pasarItem(media) {
    console.log(media);

    var promesa = this.mediaService.getMovieData(media);
    
    let navigationExtras: NavigationExtras = {
      state: {
        pasarMedia: promesa,
      },
    };
    this.router.navigate(['media-details'], navigationExtras);
  }
  search(toSearch){
    this.searchResultMovies = this.mediaService.searchMovie(toSearch);
    this.searchResultGames = this.mediaService.searchGame(toSearch);
  }
  onCancel(){
    this.searchResultMovies = this.mediaService.getRandomMovies("27");
    this.searchResultGames = this.mediaService.getRandomGames("4");
  }
}
