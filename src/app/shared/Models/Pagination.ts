import { IProduct } from "./Product"

export interface IPagination {
    totalCount: number
    pageSize: number
    pageNumber: number
    data: IProduct[]
  }
  
 