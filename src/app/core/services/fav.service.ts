import { Injectable } from '@angular/core';
import { Multimedia } from '../model/Multimedia';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  private _mapFav:Map<String,Multimedia> = new Map<String,Multimedia>();

  constructor() {}

   public saveFav(media:Multimedia){
    this._mapFav.set(media.id,media);
   }
   public deleteFav(media:Multimedia){
     this._mapFav.delete(media.id);
   }
   public checkFav(media:Multimedia):boolean {
    return this._mapFav.has(media.id);
   }
   public get mapFav(){
     return this._mapFav;
   }
}
