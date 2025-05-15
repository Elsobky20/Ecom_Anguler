import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';


@Component({
  selector: 'app-pagnation',
  standalone: false,
  templateUrl: './pagnation.component.html',
  styleUrl: './pagnation.component.scss'
})
export class PagnationComponent {
@Input() pageSize:number
@Input() totalCount:number
@Output() pageChanged = new EventEmitter()
onchangepage(event:any){
  this.pageChanged.emit(event.page??event)
}
}
