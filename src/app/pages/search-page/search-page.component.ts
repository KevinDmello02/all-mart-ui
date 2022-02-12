import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { SearchProductService } from 'src/app/services/search-product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  searchKey = '';

  dmartProductList: any;
  jioMartProductList: any;
  bigBazzarProductList: any;
//   dmartProductList: any = [{
//     "buyable": "true",
//     "manufacturer": "Premia",
//     "name": "Premia Sugar",
//     "seo_token_ntk": "premia-sugar",
//     "numberOfskus": 2,
//     "seo_meta_desc": "",
//     "seo_meta_title": "",
//     "availabilityType": "A",
//     "categoryId": "93194",
//     "categoryname": "DMart Grocery",
//     "isItemShareable": "false",
//     "uniqueId": "15112",
//     "targetUrl": "/pdp/15112",
//     "skus": [
//         {
//             "availabilityType": "A",
//             "cod": "Y",
//             "groceryType": "v",
//             "homeorpup": "0",
//             "defaultRank": "100012345",
//             "imagekey": "N/O/V/NOV110000379xx20NOV21",
//             "productImageKey": "NOV110000379xx20NOV21",
//             "binaryimgcode": "3968",
//             "imgcode": "5",
//             "price_MRP": "58.00",
//             "price_SALE": "49.00",
//             "save_price": "9.00",
//             "invstatus": "2",
//             "maxQuantity": "12",
//             "defining": [
//                 {
//                     "volume": "1 kg"
//                 }
//             ],
//             "skuUniqueID": "11345",
//             "articleNumber": "110000379",
//             "buyable": "true",
//             "default_variant": "N",
//             "bulkQuantity": "",
//             "bulkThreshold": "",
//             "exclusive": "",
//             "minBulkQuantity": "",
//             "giftItem": "",
//             "name": "Premia Sugar : 1 kg",
//             "tags": [
//                 "veg"
//             ],
//             "ribbon": ""
//         },
//         {
//             "availabilityType": "A",
//             "groceryType": "v",
//             "homeorpup": "0",
//             "cod": "Y",
//             "defaultRank": "50013346",
//             "imagekey": "I/S/u/ISugar5kgPRMI3669XX290218",
//             "productImageKey": "ISugar5kgPRMI3669XX290218",
//             "binaryimgcode": "32768",
//             "imgcode": "1",
//             "price_MRP": "285.00",
//             "price_SALE": "239.00",
//             "save_price": "46.00",
//             "invstatus": "2",
//             "maxQuantity": "3",
//             "defining": [
//                 {
//                     "volume": "5 kg"
//                 }
//             ],
//             "skuUniqueID": "11346",
//             "articleNumber": "110000380",
//             "buyable": "true",
//             "default_variant": "Y",
//             "bulkQuantity": "",
//             "bulkThreshold": "",
//             "exclusive": "",
//             "minBulkQuantity": "",
//             "giftItem": "",
//             "name": "Premia Sugar : 5 kgs",
//             "tags": [
//                 "veg"
//             ],
//             "ribbon": ""
//         }
//     ],
//     "templatetype": "Grocery"
// }];
  dmartImgURL = 'https://img.dmart.in/images/rwd/products/';
  jiomartImgURL = 'https://www.jiomart.com/';
  bigbazzarImgURL = ' https://cflare.shop.bigbazaar.com/cdn-cgi/image/width=450/';
  // https://cflare.shop.bigbazaar.com/cdn-cgi/image/width=450/media/simple/80/0901/1_2-zoom.jpg

  stores = [
    {
      name: 'Dmart',
      tooltip: 'Search in Dmart',
      selected: true
    },
    {
      name: 'Jio Mart',
      tooltip: 'Search in Jio Mart',
      selected: false
    },
    {
      name: 'Big Bazzar',
      tooltip: 'Search in Big Bazzar',
      selected: false
    }
  ];

  selectedValue: any;

  indexData = 0;
  DLoading = false;
  JLoading = false;
  BLoading = false;
  searchStore: string;

  margin = '15%'

  constructor(
    private _snackBar: MatSnackBar,
    private searchProductService: SearchProductService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    if (window.innerWidth > 500) {
      this.margin = '15%';
    } else {
      this.margin = '55%';
    }
  }

  searchProducts() {
    this.searchStore = "";
    // this.BLoading = true;
    // this.DLoading = true;
    // this.JLoading = true;
    this.stores.forEach((element, index) => {
      console.log(index, this.searchStore.length);
      if (element.selected && this.searchStore.length == 0) {
        this.searchStore = this.searchStore + element.name;
      } else if (element.selected && this.searchStore.length != 0) {
        this.searchStore = this.searchStore + ', ' + element.name;
      }
    })
    if (this.searchKey.length != 0) {
      console.log(this.searchKey);
      let payload = {
        searchKey: this.searchKey
      }

      if (this.stores[0].selected) {
        this.DLoading = true;
        this.searchProductService.getProductDetailsForDmart(payload).subscribe((res: any) => {
          // console.log(res);
          this.DLoading = false;
          if (res.suggestionView) {
            this.dmartProductList = res.suggestionView;
            console.log(this.dmartProductList);
          }
        })
      } else {
        this.DLoading = false;
      }

      if (this.stores[1].selected) {
        this.JLoading = true;
        this.searchProductService.getProductDetailsForJioMart(payload).subscribe((res: any) => {
          console.log(res);
          this.JLoading = false;
          if (res.results[0].hits) {
            this.jioMartProductList = res.results[0].hits;
          }
          // if (res.suggestionView) {
          //   this.dmartProductList = res.suggestionView;
          //   console.log(this.dmartProductList);
          // }
        })
      } else {
        this.JLoading = false;
      }

      if (this.stores[2].selected) {
        this.BLoading = true;
        this.searchProductService.getProductDetailsForBigBazzar(payload).subscribe((res: any) => {
          console.log(res);
          this.BLoading = false;
          if (res) {
            this.bigBazzarProductList = res;
            console.log(this.bigBazzarProductList);
          }
        })
      } else {
        this.BLoading = false;
      }

    } else {
      this._snackBar.open('Please enter a product!', 'Dismiss', {
        duration: 3000
      });
    }
  }

  selectStore(storeName) {
    console.log(storeName);
    this.stores.filter(data => data.name == storeName).map(x => x.selected = !x.selected)
  }

  changeSelect(event) {
    console.log(event.value);
    let count = 0;
    this.dmartProductList.forEach(element => {
      element.skus.forEach(element => {
        if (element.name == event.value) {
          console.log(element.name);
        }
        count++;
      })
    })
    this.indexData = count - 1;
  }

  sanitizeUrl(url): SafeUrl {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

}
