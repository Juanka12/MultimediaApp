import { Injectable } from '@angular/core';
import { Multimedia } from '../model/Multimedia';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private apiKey:String = "4d9eb1e1a38c5254e6ae54d958c58a47";
  
  constructor() { }

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
}
