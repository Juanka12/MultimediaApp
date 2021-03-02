import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Multimedia } from 'src/app/core/model/Multimedia';
import { FavService } from 'src/app/core/services/fav.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  private _favGames;

  constructor(private router: Router,private fav:FavService) {
   }

  ngOnInit() {
  }

  public pasarItem(media:Multimedia) {
    console.log(media);
    var promesa = new Promise((resolve,reject)=>{
      resolve(media);
    });
    
    let navigationExtras: NavigationExtras = {
      state: {
        pasarMedia: promesa,
      },
    };
    this.router.navigate(['media-details'], navigationExtras);
  }

  public get favMovies(){
    return Array.from(this.fav.mapFav.values());
  }
  public get favGames(){
    return this._favGames;
  }
}
