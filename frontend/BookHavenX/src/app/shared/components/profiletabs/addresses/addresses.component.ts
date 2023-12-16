import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../../core/services/purchase.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css'
})
export class AddressesComponent implements OnInit{
  loading: boolean = false;
  purchases: any = [];

  constructor(private purchaseService: PurchaseService){}

  ngOnInit(): void {
    this.loading = true;
    this.purchaseService.getPurchaseList().subscribe((res)=>{
      this.purchases = res;
      this.loading = false;
    },
    (err)=> {
      this.loading = false;
      console.log(err)
    })
  }


}
