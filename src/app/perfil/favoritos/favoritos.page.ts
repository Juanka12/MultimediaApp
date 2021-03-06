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

  private _favMovies:Array<Multimedia>;

  constructor(private router: Router,private fav:FavService) {
    // this.fav.mapFav.then((mapa)=>{
    //   let temp = mapa as Map<String,Multimedia>
    //   this._favMovies = Array.from(temp.values());
    // })
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
    this._favMovies = Array.from(this.fav.mapFav.values());
    return this._favMovies;
  }
}
