import { Component } from '@angular/core';
import { CopiaService } from './core/services/copia.service';
import { FavService } from './core/services/fav.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private copia:CopiaService,private fav:FavService) {
    this.copia.copiarBBDD().then((res)=>{
      console.log(res);
    }).catch((res)=>{
      console.log(res);
    });
  }
}
