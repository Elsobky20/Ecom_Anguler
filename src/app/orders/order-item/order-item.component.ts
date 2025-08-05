import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/Models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-item',
  standalone: false,
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent implements OnInit{
  order:IOrder
Id: number = 0;
// rating:IRating={
//     productId:0,
//     content:'',
//     stars:0
//   }
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService ,
    private toast:ToastrService 
  ) { }
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.Id = params['id'] ;
  })
  this.orderService.getCurrentOrderForUser(this.Id).subscribe({
    next: (response) => {
      this.order = response;
      console.log(this.order);
    },
    error: (error) => {
      console.error('Error fetching order:', error);
    }
  });
} 
//  setProductId(id:number){
//     this.rating.productId=id;
//     console.log(this.rating);
    
//     var modal = document.getElementById('ModalCenter');
//     var modalElement = new bootstrap.Modal(modal);
//     modalElement.show();
//   }
//   close(){
//     var modal = document.getElementById('ModalCenter');
//     var modalClose=bootstrap.Modal.getInstance(modal);
//     modalClose.hide();
//   }
//   UpdateRating(stars:number){
//     this.rating.stars=stars;
//     console.log(this.rating);
    
//   }
//   submit(){
//     this.orderService.addrating(this.rating).subscribe({
//       next:res=>{
//         this.close()
//         this.toast.success("Rating Added Successfully",'SUCCESS')
//       },
//       error:(err)=> {
//         this.close()
//         this.toast.error("you are already Review this product","ERROR")
        
//       },
//     })
//   }
}
