import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Models/MarketModels/Product.model';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';

const httOptiona = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  GetProducts(i : number): Observable<Product[]>{
    const  url ="https://localhost:7074/api/Products/Index/"+i ;
    return this.http.get<Product[]>(url);

  }
  Getindex(): Observable<number>{
    const  url ="https://localhost:7074/api/Products/AllIndex";
    return this.http.get<number>(url);

  }
  GetCategoryProducts(Category : Category , indx : number) : Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Category/"+Category.id+"/"+indx;
    return this.http.get<Product[]>(url);
  }
  GetTypeProduct(Type : Type , indx : number):Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Type/"+Type.id+"/"+indx;
    return this.http.get<Product[]>(url);
  }
  typeProductIndex(Type : Type) : Observable<number>{
    const url =" https://localhost:7074/api/Products/Typeindex/"+Type.id;
    return this.http.get<number>(url);
   }
  GetCompanyProduct(company:Company,idx : number):Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Company/"+company.id+"/"+idx;
    return this.http.get<Product[]>(url);
  }
  CompanyProductIndex(company:Company) : Observable<number>{
    const url =" https://localhost:7074/api/Products/companyindex/"+company.id;
    return this.http.get<number>(url);
   }
  GetCompanyTypeProduct(company:Company , type :Type , idx : number):Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/Type/Company/"+type.id+"/"+company.id+"/"+idx;
    return this.http.get<Product[]>(url);
  }
  
  GetCompanyTypeProductindex(company:Company , type :Type):Observable<number>{
    const url ="https://localhost:7074/api/Products/type/company/index/"+type.id+"/"+company.id;
    return this.http.get<number>(url);
  }
  DeleteProduct(product : Product):Observable<any>{
    const url ="https://localhost:7074/api/Products/DeleteProduct/"+product.id;
    return this.http.delete<any>(url);
  }

  CreateProduct(product:any): Observable<Product>{
    const  url ="https://localhost:7074/api/Products/CreateProduct";
    return this.http.post<Product>(url,product);
  }
  GetProduct(id : string) :Observable<Product>{
    const url ="https://localhost:7074/api/Products/"+id;
    return this.http.get<Product>(url);
  }

  EditProduct(product:any ,id :string): Observable<Product>{
    const  url ="https://localhost:7074/api/Products/UpdateProdduct/"+ id;
    return this.http.put<Product>(url,product);
  }
  CategoryProductIndex(Category : Category) : Observable<number>{
   const url =" https://localhost:7074/api/Products/CategoryIndexs/"+Category.id;
   return this.http.get<number>(url);
  }
  SearchProduct(name : string , idx : number) : Observable<Product[]>{
    const url ="https://localhost:7074/api/Products/SearchByName/"+name+"/"+idx;
    return this.http.get<Product[]>(url);
   }

   searchproductindex(name : string) : Observable<number>{
    const url =" https://localhost:7074/api/Products/SearchByName/"+name+"/index";
    return this.http.get<number>(url);
   }
  

 
}
