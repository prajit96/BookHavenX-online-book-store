import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-booklist',
  templateUrl: './sidebar-booklist.component.html',
  styleUrl: './sidebar-booklist.component.css'
})
export class SidebarBooklistComponent implements OnInit {
  @Input() handleFilterCategory: Function = (): void =>{}
 
  @Input() categoryValue:string = '';
 
  @Input() handleRatingCateogry: Function = (): void =>{}

 
  ngOnInit(): void {
  
  }
}
