import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { IBasket } from '../../shared/Models/Basket';
import { ICreateOrder } from '../../shared/Models/Order';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  @Input() delivery: FormGroup; 
  @Input() address: FormGroup;
  constructor(private _service: CheckoutService, private toast: ToastrService, private basketService: BasketService ,  private router:Router)  { }
  ngOnInit(): void {

  }
  createOrder() {
   const basket = this.basketService.GetCurrentValue();
   const order = this.getOrderCreate(basket);
   this._service.CreateOrder(order).subscribe({
      next: (value) => {
        this.basketService.deleteBasket();
        this.router.navigate(['/checkout/success'], { queryParams: { orderId: value.id } });
        this.toast.success('Order created successfully');
        this.basketService.DeleteBaskeItem(basket) ;
      },
      error: (err) => {
        console.error(err);
        this.toast.error(err.error);
      }
  });
}
  getOrderCreate(basket: IBasket):ICreateOrder {
    return{
      basketId: basket.id,
      deliveryMethodId: this.delivery.value.delivery,
      shipAddress:this.address.value
    }
    }

}
