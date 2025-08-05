import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';
import { Delivery } from '../shared/Models/Delivery';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:44335/api/'
  private basketSourse = new BehaviorSubject<IBasket>(null);
  baske$ = this.basketSourse.asObservable();
  private basketSourseTotal = new BehaviorSubject<IBasketTotal>(null);
  baskeTotal$ = this.basketSourseTotal.asObservable();
  shipPrice:number = 0;
  setShippingPrice(delivery:Delivery) {
    this.shipPrice = delivery.price;
    this.calcualateTotal();
  }

   CreatePaymentIntent(deliveryMethodId: number = 3) {
    console.log(this.GetCurrentValue().id);
    return this.http
      .post(
        this.baseURL +
          `Payments/Create?basketId=${
            this.GetCurrentValue().id
          }&deliveryId=${deliveryMethodId}`,
        {}
      )
      .pipe(
        map((value: IBasket) => {
          this.basketSourse.next(value);
          console.log('test:', value);
        })
      );
  }
  
  deleteBasket() {
    var basket: IBasket;
    this.basketSourse.next(basket);
    this.basketSourseTotal.next(null);
    localStorage.removeItem('basketId');
  }
  calcualateTotal() {
    const basket = this.GetCurrentValue();
    const shipping = this.shipPrice;
    const subTotal = basket.basketItem.reduce((a, c) => {
      return (c.price * c.quentity) + a
    }, 0)
    const totla = shipping + subTotal
    this.basketSourseTotal.next({ shipping, subTotal, totla })
  }
  GetBasket(Id: string) {
    return this.http.get(this.baseURL + "Baskets/get-basket-item/" + Id).pipe(
      map((value: IBasket) => {
        this.basketSourse.next(value)
        this.calcualateTotal()
        return value
      })
    )
  }
  SetBasket(basket: IBasket) {
    return this.http.post(this.baseURL + "Baskets/update-baske ", basket).subscribe(
      {
        next: (value: IBasket) => {
          this.basketSourse.next(value);
          this.calcualateTotal()
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
    debugger
    let basket = this.GetCurrentValue()
    console.log(basket)
      
    if (!basket||basket?.id=='null') {
      
      basket = this.CreateBasket();
    }

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
    console.log(basket)
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
      quentity: quantity,
      description: product.description
    }
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrentValue();
    const itemIndex = basket.basketItem.findIndex((i) => i.id === item.id);
    basket.basketItem[itemIndex].quentity++;
    this.SetBasket(basket);
  }

  DecrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.GetCurrentValue();
    const itemIndex = basket.basketItem.findIndex((i) => i.id === item.id);
    if (basket.basketItem[itemIndex].quentity > 1) {
      basket.basketItem[itemIndex].quentity--;
      this.SetBasket(basket);
    } else {
      this.removeItemFormBasket(item);
    }
  }
  removeItemFormBasket(item: IBasketItem) {
    const basket = this.GetCurrentValue();
    if (basket.basketItem.some((i) => i.id === item.id)) {
      basket.basketItem = basket.basketItem.filter((i) => i.id !== item.id);
      if (basket.basketItem.length > 0) {
        this.SetBasket(basket);
      } else {
        this.DeleteBaskeItem(basket);
      }
    }
  }
  DeleteBaskeItem(basket: IBasket) {
    return this.http
      .delete(this.baseURL + '/Baskets/delete-basket-item/' + basket.id)
      .subscribe({
        next: (value) => {
          this.basketSourse.next(null);
          localStorage.removeItem('basketId');
        },
        error(err) {
          console.log(err);
        },
      });
  }

}
