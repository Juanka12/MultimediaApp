import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Multimedia } from '../core/model/Multimedia';
import { FavService } from '../core/services/fav.service';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.page.html',
  styleUrls: ['./media-details.page.scss'],
})
export class MediaDetailsPage implements OnInit {
  private _media: Multimedia;
  private _checkPromise: boolean = false;
  private _saved: boolean;
  private _cleanUrl: any;
  private _MAX_RATE: number = 5;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fav: FavService
  ) {
    this.activeRoute.queryParamMap.subscribe(() => {
      var pro: Promise<any> = this.router.getCurrentNavigation().extras.state
        .pasarMedia;
      pro.then(async (res) => {
        this._media = res;
        this._saved = await this.fav.checkFav(this.media);
        let url = this.media.trailer;
        this._cleanUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this._checkPromise = true;
        console.log(this.media);
      });
    });
  }

  ngOnInit() {}

  private get numberOfEmptyStars(): number {
    return this._MAX_RATE - Math.floor(this.media.rate / 2);
  }
  get emptyStars(): any[] {
    return Array(this.numberOfEmptyStars);
  }
  private get numberOfFullStars(): number {
    return Math.floor(this.media.rate / 2);
  }
  get fullStars(): any[] {
    return Array(this.numberOfFullStars);
  }
  public get cleanUrl() {
    return this._cleanUrl;
  }
  public get media(): Multimedia {
    return this._media;
  }
  public get checkPromise() {
    return this._checkPromise;
  }
  public get saved() {
    return this._saved;
  }
  public set saved(value: boolean) {
    this._saved = value;
  }

  public saveFav() {
    this.saved = !this.saved;
    if (this.saved) {
      this.fav.saveFav(this.media);
    } else {
      this.fav.deleteFav(this.media);
    }
  }
}
