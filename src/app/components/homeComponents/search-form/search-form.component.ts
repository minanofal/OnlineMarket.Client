import { Component, OnInit, Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
 @Output() name : EventEmitter<string> = new EventEmitter();
 Name : any;
  constructor() { }

  ngOnInit(): void {
  }
 onSearch(){
 this.name.emit(this.Name);
 }
}
