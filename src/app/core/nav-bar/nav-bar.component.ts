import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/Basket';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor( private _basketService: BasketService ){}
  count:Observable<IBasket>;
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId')
    this._basketService.GetBasket(basketId).subscribe({
      next:(value)=>{
        console.log(value)
        this.count =this._basketService.baske$
      },
      error(err){
        console.log(err)
      }
    })
  }
  visibale:boolean = false ;
  hoveredItem: string | null = null;
  ToggleDropDown(){
this.visibale=!this.visibale
}
}
