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

  private searchResultMovies: Observable<any>;
  private searchResultGames: Observable<any>;

  constructor(private mediaService: MediaService, private router: Router) {}

  public get pelis() {
    return this.mediaService.pelis;
  }
  public get juegos() {
    return this.mediaService.pelis;
  }
  public pasarItem(media: Multimedia) {
    let navigationExtras: NavigationExtras = {
      state: {
        pasarMedia: media,
      },
    };
    this.router.navigate(['media-details'], navigationExtras);
  }
  search(toSearch){
    this.searchResultMovies = this.mediaService.searchMovie(toSearch);
    this.searchResultGames = this.mediaService.searchGame(toSearch);
  }
}
