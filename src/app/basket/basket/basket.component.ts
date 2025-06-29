import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { IBasket, IBasketItem } from '../../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  constructor(private _service : BasketService){}
  basket:IBasket
  ngOnInit(): void {
    this._service.baske$.subscribe({
      next:(value)=>{
        this.basket = value
      },
      error( err){
        console.log(err)
      }
    })
  }
  RemoveBasket(item:IBasketItem){
    this._service.removeItemFormBasket(item)
  }
  incrementQuantity(item:IBasketItem){
    this._service.incrementBasketItemQuantity(item);
  }
  DecrementQuantity(item:IBasketItem){
    this._service.DecrementBasketItemQuantity(item);
  }

}
