import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {
  constructor(private _service: BasketService) { }
  @Input() product: IProduct
  setBasketValue() {
    this._service.addItemToBasket(this.product)
  }
}
