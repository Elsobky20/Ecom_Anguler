import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { Delivery } from '../../shared/Models/Delivery';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery',
  standalone: false,
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit {
  deliveries:Delivery[] = [];
  constructor(
     private _service:CheckoutService ,
     private baskitService:BasketService ,
     private Toast:ToastrService
    ) { }
  @Input() delivery: FormGroup;
ngOnInit(): void {
  this._service.getDeliveryMethod().subscribe({
    next: (value) => {
      this.deliveries = value;
    },
    error: (err) => {
      console.error(err);
    },
  });
}
CreatePayment(){
  const id = this.deliveries.find(x => x.id === this.delivery.value.delivery).id;
  this.baskitService.CreatePaymentIntent(id).subscribe({
    next: (value) => {
      this.Toast.success('Payment intent created successfully');},
    error: (err) => {
      console.error('Error creating payment intent', err);
    } 
  })
}
setShippningPrice(){
    const delivery = this.deliveries.find(x => x.id === this.delivery.value.delivery); 
    this.baskitService.setShippingPrice(delivery);
  }
}
