import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from '../../Models/Basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-order-total',
  standalone: false,
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.scss'
})
export class OrderTotalComponent implements OnInit {
  basketTotals:IBasketTotal
  constructor(private basketService:BasketService){

  }
  ngOnInit(): void {
    this.basketService.baskeTotal$.subscribe({
      next:(value)=>{
        this.basketTotals = value
      },
      error(err){
        console.log(err)
      },
    })
  }

}
