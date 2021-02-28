import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  private tema:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public toggleTema(){
    this.tema=!this.tema;
  }
}