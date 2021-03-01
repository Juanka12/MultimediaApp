import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Multimedia } from '../core/model/Multimedia';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.page.html',
  styleUrls: ['./media-details.page.scss'],
})
export class MediaDetailsPage implements OnInit {

  private _media:Multimedia;
  private _checkPromise:boolean;
  private _saved:boolean = false;

  constructor(private router:Router,private activeRoute:ActivatedRoute) {
    this.activeRoute.queryParamMap.subscribe(()=> {
      var pro:Promise<any> = this.router.getCurrentNavigation().extras.state.pasarMedia;
      pro.then((res)=>{
        this._media = res;
        this._checkPromise = true;
        console.log(this.media);
      })
    })
   }

  ngOnInit() {
  }

  public get media(){
    return this._media;
  }
  public get checkPromise(){
    return this._checkPromise;
  }
  public get saved(){
    return this._saved;
  }
  public set saved(value:boolean){
    this._saved=value;
  }

  public saveFav(){
    this.saved=!this.saved;
    if (this.saved) {
      console.log(this.saved);
      
    }else{
      console.log(this.saved);
      
    }
  }
}
