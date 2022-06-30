import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Product } from 'src/app/Models/MarketModels/Product.model';
import { CartService } from 'src/app/service/Market/cart.service';
import { ProductService } from 'src/app/service/Market/product.service';
import { AddCart } from 'src/app/Models/MarketModels/AddCart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product : Product ;
  imageCount : number =0;
  qty : number =1;
  id  = localStorage.getItem('id');
  
  constructor(private productService : ProductService , private router : Router , private route : ActivatedRoute,private cartServices : CartService,   private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.GetProduct(this.route.snapshot.params['id']).subscribe(resp=>{this.product=resp;});
  }
  slecectImage(idx : number){
    this.imageCount = idx;
  }
  addCart(id:string){
    if(this.qty<1){
      this.toastr.error("Enter Qty");
      return;
    }
    const cart : AddCart = {userId :this.id?.toString() , productId : id , count : this.qty };
    this.cartServices.AddCart(cart).subscribe(()=>{this.toastr.success("Add to Cart"); this.router.navigate(['/']);},
    (e)=>{this.toastr.error("Out Of Stock");console.log(e)});
  }

}
