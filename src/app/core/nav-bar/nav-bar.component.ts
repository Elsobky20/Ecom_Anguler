import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/Basket';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor( private _basketService: BasketService  , @Inject(PLATFORM_ID) private platformId: Object){}
  count:Observable<IBasket>;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const basketId = localStorage.getItem('basketId');
      if (basketId) {
        this._basketService.GetBasket(basketId).subscribe({
          next: (value) => {
            console.log(value);
            this.count = this._basketService.baske$;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
  visibale:boolean = false ;
  hoveredItem: string | null = null;
  ToggleDropDown(){
this.visibale=!this.visibale
}
}
