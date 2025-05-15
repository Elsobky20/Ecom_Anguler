import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../shop/shop.service'
import { IProduct } from '../shared/Models/Product';
import { IPagination } from '../shared/Models/Pagination';
import { ProductParam } from '../shared/Models/Product-params'

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  
  productParam = new ProductParam();
  lenght: any;
  products: IProduct[] = [];
  totalCount: number;
  Categrioes: any;
  sortOptions= [{ name: 'Name', value: 'Name' },
    { name: 'Price: min-max', value: 'PriceAsc' },
    { name: 'Price: max-min', value: 'PriceDesc' }
  ];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getAllProduct()
    this.getAllCategroy()
  }

  getAllProduct() {
    this.shopService.getProduct(this.productParam).subscribe({
      next: ((value: IPagination) => {
        this.products = value.data
        this.lenght = value.data.length;
        this.totalCount = value.totalCount
        this.productParam.pageNumber = value.pageNumber
        this.productParam.pageSize = value.pageSize
      })
    })
  }
  getAllCategroy(): void {
    this.shopService.getCategory().subscribe({
      next: (data) => {
        console.log('Categories:', data);
        this.Categrioes = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  onchangepage(page: any) {
   // console.log('Page changed to:', event?.value ?? event?.page ?? event);
    this.productParam.pageNumber = page

   // console.log(event?.page)
    this.getAllProduct()
  }
  Isselected(id: number) {
    this.productParam.CategoryId = id;
    console.log(this.productParam)
    this.getAllProduct();
  }
  sortbyprice(sort:Event) {
    this.productParam.SortSelected=(sort.target as HTMLSelectElement).value 
    console.log(this.productParam.SortSelected)
    this.getAllProduct();
  }
  onsreach(sreach:string) {
    this.productParam.Search=sreach;
    this.getAllProduct();
  }
  @ViewChild('sreach') searchInput: ElementRef; // Reference to the search input element
  @ViewChild('SortSelected') selected: ElementRef;
  ResetValue() {
    this.productParam.Search= '';
    this.productParam.SortSelected = this.sortOptions?.[0]?.value??'';
    this.productParam.CategoryId = 0;
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
  
    if (this.selected) {
      this.selected.nativeElement.selectedIndex = 0;
    }
    this.getAllProduct();
  }
}
