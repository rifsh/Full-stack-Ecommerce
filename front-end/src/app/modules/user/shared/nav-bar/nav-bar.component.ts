import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre, ProductModel, ResponseProduct } from 'src/app/core/models/allproducts.model';
import { Cart } from 'src/app/core/models/cartModel';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class NavBarComponent implements OnInit {
  searchCondition: boolean;
  showcart: boolean;
  logLinkShow: boolean;
  logoutLinkShow: boolean;
  wishList: boolean;
  drpdownValues: string = "Collections";
  searchValue: string;
  searchedArray: ProductModel[] = [];
  categoriesDivCondition: boolean = false;
  genres: Genre[] = [];

  constructor(private srvc: UserSrvcService, private route: Router, private productService: UserProductsService, private adminService: AdminSrvcService, private router: Router) { }

  @Output() searchText: EventEmitter<ResponseProduct> = new EventEmitter<ResponseProduct>;
  @Input() cartIconCount: number;

  ngOnInit(): void {
    this.searchCondition = this.srvc.showSearchBox;
    this.showcart = this.srvc.showCart;
    this.wishList = this.srvc.wishList;
    this.logLinkShow = !this.srvc.isLogged;
    this.logoutLinkShow = this.srvc.isLogged;
    this.updatingCartCount();
    this.fetchGenres();
  }

  searchOperation() {
    this.productService.searching(this.searchValue).subscribe({
      next: (res) => {
        this.searchText.emit(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  fetchGenres() {
    this.adminService.fetchGenres().subscribe({
      next: (res) => {
        this.genres = res.data;
      }
    })
  }

  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.logLinkShow = true;
    this.logoutLinkShow = false;
    this.showcart = false;
    this.wishList = false;
    this.srvc.isLogged = false;
    this.route.navigate(['login']);
  }

  updatingCartCount() {
    this.productService.fetchCartProducts().subscribe({
      next: (res: Cart) => {
        this.cartIconCount = res.datas.products.length;
      }
    })
  }

  // Trigger on hover
  categories() {
    this.categoriesDivCondition = true;
  }

  // Hide when mouse leaves
  categoriesOff() {
    this.categoriesDivCondition = false;
  }

  filterProducts(category: string) {
    this.router.navigate(['/user/all-products'], { queryParams: { category } });
  }
}
