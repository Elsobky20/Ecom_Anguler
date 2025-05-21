import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:44335/api/'
  private basketSourse = new BehaviorSubject<IBasket>(null);
  baske = this.basketSourse.asObservable();

  GetBasket(Id: string) {
    return this.http.get(this.baseURL + "Baskets/get-basket-item/" + Id).pipe(
      map((value: IBasket) => {
        this.basketSourse.next(value)
        console.log(value)

      })
    )
  }
  SetBasket(basket: IBasket) {
    return this.http.post(this.baseURL + "Baskets/update-baske ", basket).subscribe(
      {
        next: (value: IBasket) => {
          this.basketSourse.next(value);
          console.log(value)
        },
        error(err) {
          console.log(err)
        },
      }
    )
  }
  GetCurrentValue() {
    return this.basketSourse.value
  }


  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.MapPrpductToBasketItem(product, quantity);
    const basket = this.GetCurrentValue() ?? this.CreateBasket();
    basket.basketItem = this.AddOrUpdate(basket.basketItem, itemToAdd, quantity);
    return this.SetBasket(basket)
  }
  private AddOrUpdate(basketItem: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = basketItem.findIndex(i => i.id === itemToAdd.id);
    if (index == -1) {
      itemToAdd.quentity = quantity;
      basketItem.push(itemToAdd)
    }
    else {
      basketItem[index].quentity += quantity;
    }
    return basketItem;
  }

  private CreateBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }
  MapPrpductToBasketItem(product: IProduct, quantity: number): IBasketItem {
    return {
      id: product.id,
      category: product.categoryName,
      image: product.photos[0].imageName,
      name: product.name,
      price: product.newPrice,
      quentity: quantity
    }
  }
}
