import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  visibale:boolean = false ;
  hoveredItem: string | null = null;
  ToggleDropDown(){
this.visibale=!this.visibale
}
}
