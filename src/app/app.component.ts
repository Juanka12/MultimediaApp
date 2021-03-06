import { Component } from '@angular/core';
import { CopiaService } from './core/services/copia.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private copia:CopiaService) {
    this.copia.copiarBBDD().then((res)=>{
      console.log(res);
    }).catch((res)=>{
      console.log(res);
    });
  }
}
