import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  private aboutText:String[] = ["Projecto de la asignatura programación móviles","Autor : Juan Carlos"];
  constructor() { }

  ngOnInit() {
  }

}
