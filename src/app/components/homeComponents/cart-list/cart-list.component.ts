import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/Models/MarketModels/Cart.model';
import { CartService } from 'src/app/service/Market/cart.service';
@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  carts : Cart[];
  constructor(private cartServices : CartService,   private toastr: ToastrService ,  private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.cartServices.GetAllCarts(this.route.snapshot.params['id']).subscribe(resp => this.carts =resp);
  }
  Remove(id : string){
    this.cartServices.DeleteCarts(id).subscribe( () =>{
      this.carts = this.carts.filter(c=> c.id !== id);
      this.toastr.success("The Product Updated Successfully");},
    ()=>{this.toastr.error("some Thing Went wrong")});
  }

}
