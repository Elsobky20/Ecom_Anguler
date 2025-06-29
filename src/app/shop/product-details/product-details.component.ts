import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProduct } from '../../shared/Models/Product';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private shopService: ShopService, 
    private route: ActivatedRoute,
    private tost:ToastrService,
    private basketService:BasketService
  ){ }
  product: IProduct
  mainImage: string;
  quentity : number = 1
  ngOnInit(): void {
    this.loadProduct()
  }
  loadProduct() {
    this.shopService.getProductDetails(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: ((value: IProduct) => {
          this.product = value
          this.mainImage = this.product.photos[0].imageName
        })
      })
  }
  ReplaceImage(src: string) {
    this.mainImage = src
  }
  IncrementBasket(){
    if(this.quentity<10){
      this.quentity ++
      this.tost.success("Item has been added to the basket" , "success")
    }else{
       this.tost.error("you can't add more than 10 Item" , "Enough")
    }

  }
  DecrementBasket(){
    if(this.quentity>1){
      this.quentity --
      this.tost.warning("Item has been Decrement " , "success")
    }else{
       this.tost.error("you can't Decrement more than 1 Item" , "error")
    }

  }
  AddToBasket(){
    this.basketService.addItemToBasket(this.product , this.quentity)
  }
  CalculateDiscount(oldPrice:number , NewPrice:number): number{
return parseFloat(Math.round(((oldPrice-NewPrice)/oldPrice)*100).toFixed(1)
)

  }
}
