import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HomePage } from './home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menu:MenuController) {
  }

  public toggle(){
    this.menu.close();
  }
}
