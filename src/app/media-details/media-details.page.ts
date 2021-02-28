import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Multimedia } from '../core/model/Multimedia';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.page.html',
  styleUrls: ['./media-details.page.scss'],
})
export class MediaDetailsPage implements OnInit {

  private media:Multimedia;
  private checkPromise:boolean;

  constructor(private router:Router,private activeRoute:ActivatedRoute) {
    this.activeRoute.queryParamMap.subscribe(()=> {
      var pro:Promise<any> = this.router.getCurrentNavigation().extras.state.pasarMedia;
      pro.then((res)=>{
        this.media = res;
        this.checkPromise = true;
        console.log(this.media);
      })
    })
   }

  ngOnInit() {
  }

}
