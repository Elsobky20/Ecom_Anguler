import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: false,
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {
constructor(private route:ActivatedRoute) { }
  orderId:number=0;
  ngOnInit(): void {
    this.route.queryParams.subscribe(param=>{
      this.orderId=param['orderId'];
    })
  }
}
