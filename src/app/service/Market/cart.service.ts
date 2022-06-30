import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/Models/MarketModels/Cart.model';
import { AddCart } from 'src/app/Models/MarketModels/AddCart.model';
const httOptiona = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient) { }
  GetAllCarts(id? : string):Observable<Cart[]>{
    const url = "https://localhost:7074/api/Carts";
    return this.http.get<Cart[]>(url);
  }
  GetAllCartscount(id? : string):Observable<number>{
    const url = "https://localhost:7074/api/Carts/count/"+id;
    return this.http.get<number>(url);
  }
  DeleteCarts(id? : string):Observable<Cart[]>{
    const url = "https://localhost:7074/api/Carts/"+id;
    return this.http.delete<Cart[]>(url);
  }
  AddCart(type : AddCart):Observable<any>{
    const url="https://localhost:7074/api/Carts/AddCart";
    return this.http.post<any>(url,type,httOptiona);
  }
}
