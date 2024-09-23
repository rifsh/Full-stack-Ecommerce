import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseProductView } from 'src/app/core/models/allproducts.model';
import { WishList } from 'src/app/core/models/wishlistModel';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.css']
})
export class ViewWishlistComponent implements OnInit {

  constructor(private userService: UserSrvcService, private productService: UserProductsService, private toast: ToastrService) { }
  wishListProducts: ResponseProductView[] = [];

  ngOnInit(): void {
    this.userService.showSearchBox = false;
    this.userService.showCart = true;
    this.userService.wishList = false;
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.fetchWishList().subscribe({
      next: (res: WishList) => {
        this.wishListProducts = res.data;
      }
    })
  }

  delete(id: string) {
    this.productService.deleteFromWishlist(id).subscribe({
      next: (res) => {
        this.toast.warning('Deleted from wishlist');
        this.fetchProducts()
      },
      error: (err) => {
        this.toast.warning('Something went wrong');
      }
    })
  }
}
