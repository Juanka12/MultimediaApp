import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CopiaService } from './core/services/copia.service';
import { FavService } from './core/services/fav.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private copia:CopiaService,private fav:FavService,private menu:MenuController) {
    this.copia.copiarBBDD().then((res)=>{
      console.log(res);
      this.fav.getData();
    }).catch((res)=>{
      console.log(res);
    });
  }
  public toggle(){
    this.menu.close();
  }
}
