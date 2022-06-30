import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/service/Market/product.service';


@Component({
  selector: 'app-indexs',
  templateUrl: './indexs.component.html',
  styleUrls: ['./indexs.component.css']
})
export class IndexsComponent implements OnInit {
 
  @Output() idx :  EventEmitter<number> = new EventEmitter();
  @Input() indixs : number[] = [];

  @Input() showFinal : boolean = false;
  @Input() finalindx : number;
  @Input() showfirst : boolean = false ;
  constructor( ) { 
    
    
  }

  ngOnInit(): void {
  
  }
    
  
  passidx(i:number){
    
    this.idx.emit(i);
  }

}
