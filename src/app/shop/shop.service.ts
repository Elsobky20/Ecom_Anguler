import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/Pagination';
import { ProductParam } from '../shared/Models/Product-params';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root'
})

export class ShopService{
  baseURL = 'https://localhost:44335/api/'
  Product:any
  constructor(private http: HttpClient) { }

  getProduct(productParam:ProductParam) {
    let param =new HttpParams()
    if(productParam.CategoryId){
      param = param.append("categoryId" ,productParam.CategoryId)
    }
    if(productParam.Search){
      param = param.append("Search" ,productParam.Search)
    }
    if(productParam.SortSelected){
      param = param.append("Sort" ,productParam.SortSelected)
    }
    param = param.append("pageNumber",productParam.pageNumber)
    param = param.append("pageSize",productParam.pageSize)
    return this.http.get<IPagination>(this.baseURL+"Product/get-all" , {params:param});
  }
  getProductDetails(id:number){
    return this.http.get<IProduct>(this.baseURL+"Product/get-by-id/"+id)
  }
  getCategory() {
    return this.http.get<IPagination>(this.baseURL+"Categories/get-all"); // 
  }
}
