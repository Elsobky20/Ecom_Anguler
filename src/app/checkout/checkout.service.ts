import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../shared/Models/Delivery';
import { ICreateOrder, IOrder } from '../shared/Models/Order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
baseURL = 'https://localhost:44335/api/';
   constructor(private http: HttpClient) {}
  updateAddress(form: any) {
    return this.http.put(this.baseURL + 'Account/update-address', form);
  }
  getAddress() {
    return this.http.get(this.baseURL + 'Account/get-address-for-user');
  }
  getDeliveryMethod() {
    return this.http.get<Delivery[]>(this.baseURL + 'Orders/get-delivery');
  }
  CreateOrder(order: ICreateOrder) {
    return this.http.post<IOrder>(this.baseURL + 'Orders/create-order', order);
  }
}
