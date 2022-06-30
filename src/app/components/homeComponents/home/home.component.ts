import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/Market/category.service';
import { Category } from 'src/app/Models/MarketModels/category.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/service/Ui/confirmation-dialog.service';
import { TypeService } from 'src/app/service/Market/type.service';
import { CompanyService } from 'src/app/service/Market/company.service';
import { Type } from 'src/app/Models/MarketModels/type.model';
import { TypeForm } from 'src/app/Models/MarketModels/TypeForm.model';
import { Company } from 'src/app/Models/MarketModels/Company.model';
import { ProductService } from 'src/app/service/Market/product.service';
import { Product } from 'src/app/Models/MarketModels/Product.model';
import { CartService } from 'src/app/service/Market/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories : Category[];
  categoryErrorMessage : string = "";
  passedid :string;
  selectedCategory : Category;
  selectedType : Type;
  types : Type[] =[] ;
  companies : Company[]=[];
  displayanimation : boolean = false;
  showCategoryCompanantes : boolean = false ;
  showCompanyForm : boolean = false;
  showCompanyAnimation : boolean= false;
  displayanimationproduct:boolean=true;
  EditedCompany :Company;
  showCompanyEditForm : boolean = false;
  showCompanyEditAnimation : boolean= false;
  editedCompnaySelectedTypes : Type[]=[];
  editedCompnayUnSelectedTypes : Type[]=[];
  roles = localStorage.getItem("roles");
  rolescjeck? :boolean;
  products : Product[] =[];
  indexs : number;
  selectedCompany : Company;

  serching : boolean = false ;

  selecttype : boolean = false;
  selectedid : string;

  checkSelectCategory : boolean = false;
  checkSelectCompany : boolean = false;

  showSearchForm : boolean = false;
  showSearchAnimation : boolean = false;

  indixs : number[] = [];
  finalindx : number = 0;
  startindex : number =0;
  showFinal : boolean = false;
  firstindex : number =1;
  showfirst : boolean = false ;

  n:string;
  countcart : number;
  constructor(private typeService : TypeService,
    private categoryService : CategoryService ,
    private toastr: ToastrService,
     private dialogService : ConfirmationDialogService,
     private companyService : CompanyService,
     private productServices : ProductService,
     private cartService : CartService) { }



  ngOnInit(): void {
    
    this.cartService.GetAllCartscount( localStorage.getItem("id")?.toString()).
    subscribe(resp => this.countcart =resp);
    this.productServices.Getindex().subscribe(resp=>{ 
      if(resp<=20){
        this.indixs =Array(resp);
        for(var i =0 ; i<resp ; i++){
         this.indixs[i]=i;
        }
      }
      else{
        this.indixs =Array(20);
        for(var i =0 ; i<20 ; i++){
         this.indixs[i]=i;
      }
      this.finalindx = resp;
      this.showFinal = true;
    }
   
    });

    this.productServices.GetProducts(1).subscribe(resp => {this.products =resp;
      for(let p of this.products){
        p.countimage =0 ;
      }
    });

    this.categoryService.GetAllCategories()
    .subscribe(resp =>
        {
          this.categories = resp;
        });
        this.rolescjeck=this.roles?.includes("Admin");
  }


  addNewCategory(event : any){
    this.categoryService.CreateCategory(event)
    .subscribe(resp=>
      {
        this.categories.push(resp);
         this.toastr.success('Category added successfully');
         },err=> {
           this.toastr.error(err.error);
          });
  }


  deletcategory(category : Category){
    this.dialogService.confirmDialog({
      title: 'Delete Category',
      message: 'Are You Sure Want Delete That Category?',
      confirmCaption: 'Yes',
      cancelCaption: 'Cancel',
    }).subscribe(c => {
      if(c){this.categoryService.DeleteCategory(category).subscribe(resp => 
        {
          this.categories=this.categories.filter(c=>c.id!==resp);
          this.toastr.success('Category deleted successfully');
        }
      ,err=> {this.toastr.error(err.error)})
      }});
  }


  PassID(id:string){
    this.passedid = id;
  }


  selectedcategory(event : Category){
    this.checkSelectCategory = true; 
    if(this.selectedCategory!=event){
      this.selectedCategory = event;
      this.typeService.GetTypes(event)
        .subscribe(resp=>
          {
            this.types=resp;
          } , err =>{ 
              this.toastr.error(err.error);
          });
      this.companyService.GetCompanies(event)
      .subscribe(resp =>{
        this.companies = resp;
      }, err =>{ 
        this.toastr.error(err.error);
      } 
      )
      this.productServices.GetCategoryProducts(event , 1)
      .subscribe(resp => {this.products = resp; for(let p of this.products){
        p.countimage =0 ;
      }}
        ,err =>{ 
          this.toastr.error(err.error);
        } );
        this.productServices.CategoryProductIndex(event).subscribe(resp => {if(resp<=20){
          this.indixs =Array(resp);
          for(var i =0 ; i<resp ; i++){
           this.indixs[i]=i;
          }
        }
        else{
          this.indixs =Array(20);
          for(var i =0 ; i<20 ; i++){
           this.indixs[i]=i;
        }
        this.finalindx = resp;
        this.showFinal = true;
      }
     
      });
      this.serching = false;
      this.showSearchForm = false;
    }
    
    this.displayanimation = false;
    this.showCategoryCompanantes=false;
    setTimeout(()=>{
    this.displayanimation = true;
    this.showCategoryCompanantes=true;
    },100);
    
  }



  home(){
    this.displayanimation=false;
    setTimeout(()=>{
  this.showCategoryCompanantes  =false ;
    },500);
    this.productServices.GetProducts(1).subscribe(resp => {this.products =resp; for(let p of this.products){
      p.countimage =0 ;
    }});
    this.productServices.Getindex().subscribe(resp=>{ 
      if(resp<=20){
        this.indixs =Array(resp);
        for(var i =0 ; i<resp ; i++){
         this.indixs[i]=i;
        }
      }
      else{
        this.indixs =Array(20);
        for(var i =0 ; i<20 ; i++){
         this.indixs[i]=i;
      }
      this.finalindx = resp;
      this.showFinal = true;
    }
   
    });
    this.selecttype = false;
    this.checkSelectCategory = false;
    this.checkSelectCompany=false;
    this.serching = false;
  }



  NewType(event : TypeForm){
    this.typeService.CreateType(event).subscribe(
      resp => {
        this.types.push(resp); 
      this.toastr.success('Type added successfully');}, 
      err=> {this.toastr.error(err.error)});
  }



  deletedType(event : Type){
    this.dialogService.confirmDialog({
      title: 'Delete Type',
      message: 'Are You Sure Want Delete That Type?',
      confirmCaption: 'Yes',
      cancelCaption: 'Cancel',
    }).subscribe(c => {
      if(c){this.typeService.DeleteType(event).subscribe(resp => 
        {
          this.types=this.types.filter(c=>c.id!==resp);
          this.companyService.GetCompanies(this.selectedCategory)
          .subscribe(resp =>{
            this.companies = resp;
            console.log(resp);
          }, err =>{ 
            this.toastr.error(err.error);
          } 
          )
          this.toastr.success('Type deleted successfully');
        }
      ,err=> {this.toastr.error(err.error)})
      }});
  }


  
  edittype(event : TypeForm){
    this.typeService.UpdateType(event).subscribe(
      resp => {
      this.toastr.success(`Type ${resp.name} Edited successfully`);}, 
      err=> {this.toastr.error(err.error)});
  }

  selectType(event : Type){
    this.selectedid="";
    this.selecttype = true;
    this.selectedType = event;
    this.checkSelectCompany =false;
    this.companyService.GetCompaniesType(event).
    subscribe(resp=>{
      this.companies = resp;
    },err =>{this.toastr.error(err.error);});
    this.productServices.GetTypeProduct(event ,1)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;
    }}
      ,err =>{ 
        this.toastr.error(err.error);
      } );
    this.productServices.typeProductIndex(event).subscribe(resp => {if(resp<=20){
      this.indixs =Array(resp);
      for(var i =0 ; i<resp ; i++){
       this.indixs[i]=i;
      }
    }
    else{
      this.indixs =Array(20);
      for(var i =0 ; i<20 ; i++){
       this.indixs[i]=i;
    }
    this.finalindx = resp;
    this.showFinal = true;
  }
 
  });
  }
  AllTypes(){
    this.selectedid="";
    this.selecttype =false;
    this.companyService.GetCompanies(this.selectedCategory)
    .subscribe(resp =>{
      this.companies = resp;
    }, err =>{ 
      this.toastr.error(err.error);
    } 
    )
    this.productServices.GetCategoryProducts(this.selectedCategory,1)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;
    }}
      ,err =>{ 
        this.toastr.error(err.error);
      } );
      this.productServices.CategoryProductIndex(this.selectedCategory).subscribe(resp => {if(resp<=20){
        this.indixs =Array(resp);
        for(var i =0 ; i<resp ; i++){
         this.indixs[i]=i;
        }
      }
      else{
        this.indixs =Array(20);
        for(var i =0 ; i<20 ; i++){
         this.indixs[i]=i;
      }
      this.finalindx = resp;
      this.showFinal = true;
    }
   
    });
      this.checkSelectCompany = false;
  }
  newcompany(){
    
    if(this.types[0]==null){
      this.toastr.error('There is no Types please create types first');
      return;
    }
    this.showCompanyAnimation = ! this.showCompanyAnimation;
    if( this.showCompanyForm == true){
      setTimeout(()=>{
        this.showCompanyForm = false ;
          },500);}
          else{
            this.showCompanyForm = true;
          }
    }

    submitNewCompany(event : any){
      this.companyService.CreateCompany(event)
      .subscribe(resp => {this.companies.push(resp);
      this.toastr.success("Company Created Successfully");
    this.newcompany();},
      err=> this.toastr.error(err.error));
    }
    delete(event : Company){
      
        this.dialogService.confirmDialog({
          title: 'Delete Company',
          message: 'Are You Sure Want Delete This Company?',
          confirmCaption: 'Yes',
          cancelCaption: 'Cancel',
        }).subscribe(c => {
          if(c){this.companyService.DeleteCompany(event).subscribe(resp => 
            {
              this.companies=this.companies.filter(c=>c.id!==resp.id);
              this.toastr.success(resp.message);
            }
          ,err=> {this.toastr.error(err.error)})
          }});
    }
    edit(event : Company){
      this.editedCompnaySelectedTypes  =[];
      this.editedCompnayUnSelectedTypes=[];
      for(let t of this.types){
        if(event.types.includes(t.id)){
          this.editedCompnaySelectedTypes.push(t);
        }
        else{
          this.editedCompnayUnSelectedTypes.push(t);
        }
      }
      this.EditedCompany = event;
      this.showCompanyEditAnimation = ! this.showCompanyEditAnimation;
      if( this.showCompanyForm == true){
        setTimeout(()=>{
          this.showCompanyEditForm = false ;
            },500);}
            else{
              this.showCompanyEditForm = true;
            }
    }
    cancelEdit(){
      this.showCompanyEditAnimation = ! this.showCompanyEditAnimation;
      if( this.showCompanyForm == true){
        setTimeout(()=>{
          this.showCompanyEditForm = false ;
            },500);}
            else{
              this.showCompanyEditForm = true;
            }
    }
    SelectCompany(event :Company){
      this.selectedid = event.id;
      this.selectedCompany = event ;
      this.checkSelectCompany= true;
     if(!this.selecttype){
      this.productServices.CompanyProductIndex(event).subscribe(resp=>{ 
        if(resp<=20){
          this.indixs =Array(resp);
          for(var i =0 ; i<resp ; i++){
           this.indixs[i]=i;
          }
        }
        else{
          this.indixs =Array(20);
          for(var i =0 ; i<20 ; i++){
           this.indixs[i]=i;
        }
        this.finalindx = resp;
        this.showFinal = true;
      }
     
      });
      this.productServices.GetCompanyProduct(event,1)
      .subscribe(resp => {this.products = resp; for(let p of this.products){
        p.countimage =0 ;
      }}
        ,err =>{ 
          this.toastr.error(err.error);
        } )
    }
  else{
    this.productServices.GetCompanyTypeProductindex(event, this.selectedType).subscribe(resp=>{ 
      if(resp<=20){
        this.indixs =Array(resp);
        for(var i =0 ; i<resp ; i++){
         this.indixs[i]=i;
        }
      }
      else{
        this.indixs =Array(20);
        for(var i =0 ; i<20 ; i++){
         this.indixs[i]=i;
      }
      this.finalindx = resp;
      this.showFinal = true;
    }
   
    });
  this.productServices.GetCompanyTypeProduct(event, this.selectedType,1)
  .subscribe(resp => {this.products = resp; for(let p of this.products){
    p.countimage =0 ;
  }}
    ,err =>{ 
      this.toastr.error(err.error);
    } )
  }
    
}

Deleteproduct(event : Product){
  this.dialogService.confirmDialog({
    title: 'Delete Product',
    message: 'Are You Sure Want Delete This Product?',
    confirmCaption: 'Yes',
    cancelCaption: 'Cancel',
  }).subscribe(c => {
    if(c){this.productServices.DeleteProduct(event).subscribe(resp => 
      {
        this.products=this.products.filter(c=>c.id!==resp);
        this.toastr.success("Product Deleted Successully");
      }
    ,err=> {this.toastr.error(err.error)})
    }});
}
Idx(i : any){
  if(i>=this.indixs[0]+5 && i+20< this.finalindx){
    this.showFinal = true;
    this.showfirst = true;
    this.indixs = Array(20);
    var j =i-1;
    for(let i=0;i<20;i++){
      this.indixs[i]=j;
      j++;
    }
  }
  else if(i<this.indixs[0]+5 && i< this.finalindx ){
    this.showfirst = true;
    this.showFinal = true;
    if(i>=18){
    var j =i-18;
    for(let i=0;i<20;i++){
      this.indixs[i]=j;
      j++;
    }}
    else{
      this.showfirst = false;
      for(let i=0;i<20;i++){
        this.indixs[i]=i;
      
      }
    }
  }
  else if (i>=this.indixs[0]+5 && i+20> this.finalindx){
    this.showfirst = true;
    this.showFinal = false;
    var j =this.finalindx-20;
    for(let i=0;i<20;i++){
      this.indixs[i]=j;
      j++;
    }
  }
  this.displayanimationproduct=false;
  setTimeout(()=>{
this.displayanimationproduct  =true ;
  },0);

  if(this.serching){
    this.productServices.SearchProduct(this.n , i+1)
  .subscribe(resp => {this.products = resp; for(let p of this.products){
    p.countimage =0 ;
  }
  window.scrollTo(0, 0);}
    ,err =>{ 
      this.toastr.error(err.error);
      console.log(err);
    } );

  }
 
  else if(!this.checkSelectCategory && !this.selecttype && !this.checkSelectCompany ){
   
    this.productServices.GetProducts(i+1).subscribe(resp => {this.products =resp;
      for(let p of this.products){
        p.countimage =0 ;
      }
      window.scrollTo(0, 0);
    });
  }
  else if(this.checkSelectCategory && !this.selecttype && !this.checkSelectCompany){
    this.productServices.GetCategoryProducts(this.selectedCategory ,i+1)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;

    } window.scrollTo(0, 0);}
      ,err =>{ 
        this.toastr.error(err.error);
      } );
  }
  else if( this.selecttype && !this.checkSelectCompany){
    this.productServices.GetTypeProduct(this.selectedType ,i+1)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;
    }}
      ,err =>{ 
        this.toastr.error(err.error);
      } );
  }
  else if(!this.selecttype && this.checkSelectCompany){
    this.productServices.GetCompanyProduct(this.selectedCompany ,i+1)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;
    }}
      ,err =>{ 
        this.toastr.error(err.error);
      } );
  }
  else{
    this.productServices.GetCompanyTypeProduct(this.selectedCompany , this.selectedType ,i+1)
    .subscribe(resp => {this.products = resp; for(let p of this.products){
      p.countimage =0 ;
    }}
      ,err =>{ 
        this.toastr.error(err.error);
      } );
  }

}
ClickSearch(){
  this.home();
  this.showSearchAnimation =! this.showSearchAnimation; 
  if(this.showSearchForm){
    setTimeout(()=>{
      this.showSearchForm = false ;
        },400);
  }
  else {
    this.showSearchForm = true;
  }
  
 
}

SearchByName(n : string){
  this.serching = true;
  this.n = n;
  this.productServices.SearchProduct(n , 1)
  .subscribe(resp => {this.products = resp; for(let p of this.products){
    p.countimage =0 ;
  }}
    ,err =>{ 
      this.toastr.error(err.error);
      console.log(err);
    } );

    this.productServices.searchproductindex(n)
    .subscribe(resp=>{ 
      console.log(resp);
      if(resp<=20){
        this.indixs =Array(resp);
        for(var i =0 ; i<resp ; i++){
         this.indixs[i]=i;
        }
      }
      else{
        this.indixs =Array(20);
        for(var i =0 ; i<20 ; i++){
         this.indixs[i]=i;
      }
      this.finalindx = resp;
      this.showFinal = true;
    }
   
    });
}
} 

