import {v4 as uuidv4} from 'uuid'
export interface IBasket {
  id: string
  basketItem: IBasketItem[]
}

export interface IBasketItem {
  id: number
  name: string
  image: string
  quentity: number
  description:string
  price: number
  category: string
}
export class Basket implements IBasket{
    id = uuidv4();
    basketItem: IBasketItem[]=[];

}
export interface IBasketTotal{
  shipping:number
  subTotal:number
  totla:number
}