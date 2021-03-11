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

  constructor(private platform: Platform, private sqlite: SQLite) {
  }

   public saveFav(media:Multimedia){
    this._mapFav.set(media.id,media);
    this.executeSentence('insert into Media(id,title,text,src,rate,genre,type,trailer) values(?,?,?,?,?,?,?,?)',[media.id,media.title,media.text,media.src,media.rate,JSON.stringify(media.genre),media.type,media.trailer])
   }
   public deleteFav(media:Multimedia){
     this._mapFav.delete(media.id);
     this.executeSentence('delete from Media where id = ?',[media.id]);
   }
   public async checkFav(media:Multimedia):Promise<boolean> {
    let checked=false;
    await this.executeSentence('select * from Media where id = ?',[media.id]).then((data)=>{
      checked=Boolean(data["rows"].length);
    });
    return checked;
   }

   public get mapFav(){
    return this._mapFav;
   }

   public getData(){
    this.executeSentence('select * from Media',[]).then((data)=>{
      for (let index = 0; index < data["rows"].length; index++) {
        let datos = data["rows"].item(index);
        let media:Multimedia = new Multimedia(datos.src,datos.text,datos.title,JSON.parse(datos.genre),datos.id,datos.rate,datos.type);
        media.trailer=datos.trailer;
        this._mapFav.set(media.id,media);
      }
    })
   }

   private executeSentence(sqlSentence: string, searchParam: any[]) {
    return new Promise(async (resolve,reject) => {
      let consultable = true;
      if (!this.db) {
        await this.openDB()
        .then(()=>{
          console.log(this.db);   
        })
        .catch((e) => {
          consultable = false;
          reject("Fallo al cargar"+e);
        });
      }
      if (consultable) {
        this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          console.log("Resuelto : "+JSON.stringify(data));
          resolve(data);
        })
        .catch((e) => {
          console.log("fallo al ejecutar sentencia "+JSON.stringify(e));
          reject("Fallo al ejecutar sentencia");
        });
      }
    });
  }

   private openDB() {
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
