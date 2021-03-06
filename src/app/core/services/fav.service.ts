import { Injectable } from '@angular/core';
import { Multimedia } from '../model/Multimedia';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class FavService {

  private db:SQLiteObject;
  private _mapFav:Map<String,Multimedia> = new Map<String,Multimedia>();

  constructor(private platform: Platform, private sqlite: SQLite) {}

   public saveFav(media:Multimedia){
    this._mapFav.set(media.id,media);
    this.db.executeSql('insert into Media(id,title,text,src,rate,genre,type) values (?,?,?,?,?,?,?,)',[media.id,media.title,media.text,media.src,media.rate,media.genre.toString(),media.type])
    .then((data)=>{
      console.log(data);
    });
   }
   public deleteFav(media:Multimedia){
     this._mapFav.delete(media.id);
     this.db.executeSql('delete from Media where id = ?',[media.id]).then((data)=>{
      console.log(data);
    });
   }
   public checkFav(media:Multimedia):boolean {
     this.db.executeSql('select * from Media where id = ?',[media.id]).then((data)=>{
      console.log(data);
    });
    return this._mapFav.has(media.id);
   }
   public get mapFav(){
     this.db.executeSql('select * from Media').then((data)=>{
       console.log(data);
     });
     return this._mapFav;
   }

   openDB() {
    return new Promise((resolve,reject) => {
    this.platform
      .ready()
      .then(() => {
        this.sqlite
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            resolve("DB abierta correctamente");
          })
          .catch((err) => {
            console.log(err);
            reject("Fallo al abrir DB");
          });
      })
      .catch(()=>{
        reject("Fallo al comprobar el dispositivo");
      });
    });
  }
  private getConector() {
    return {
      name: "MultimediaDB.db",
      location: "default",
      createFromLocation: 1,
    };
  }
}
