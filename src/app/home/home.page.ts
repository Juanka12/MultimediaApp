import { Component } from '@angular/core';
import { MediaService } from '../core/services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private mediaService:MediaService) {}

  public get pelis() {
    return this.mediaService.pelis;
  }
  public get juegos() {
    return this.mediaService.pelis;
  }
}
