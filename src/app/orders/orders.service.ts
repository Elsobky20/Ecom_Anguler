import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../shared/Models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
baseURL = 'https://localhost:44335/api/';
  constructor(private http: HttpClient) { }

  getCurrentOrderForUser(id:number){
    return this.http.get<IOrder>(this.baseURL+"Orders/get-order-by-id/"+id)
  }
  getAllOrderForUser(){
    return this.http.get<IOrder[]>(this.baseURL+"Orders/get-orders-for-user")
  }
  // addrating(rate:IRating){
  //   return this.http.post(this.baseURL+"Ratings/add-rating",rate)
  // } 
}
