import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SearchProductService } from 'src/app/services/search-product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchKey = '';

  constructor(
    private _snackBar: MatSnackBar,
    private searchProductService: SearchProductService
  ) { }

  ngOnInit(): void {
  }

  searchProducts() {
    if (this.searchKey.length != 0) {
      console.log(this.searchKey);
      let payload = {
        searchKey: this.searchKey
      }

      this.searchProductService.getProductDetailsForDmart(payload).subscribe((res: any) => {
        console.log(res);
      })

    } else {
      this._snackBar.open('Please enter a product!', 'Dismiss', {
        duration: 3000
      });
    }

  }

}
