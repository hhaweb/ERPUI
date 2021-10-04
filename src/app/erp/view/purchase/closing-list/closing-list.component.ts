import { Table } from 'primeng/table';
import { ErpUtilityService } from 'src/app/erp/services/utility-services/erp-utility.service';
import { JsUtilityService } from 'src/app/erp/services/utility-services/js-utility.service';
import { PurchaseService } from './../../../services/controller-services/purchase.service';
import { ClosingModel } from './../../../models/purchase/purchase';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-closing-list',
  templateUrl: './closing-list.component.html',
  styleUrls: ['./closing-list.component.scss']
})
export class ClosingListComponent implements OnInit {
  closingList: ClosingModel[] = [];
  tableLoading: boolean;
  totalRecords: number;
  constructor(    
    private purchaseService: PurchaseService,
    private erpUtilityService: ErpUtilityService,
    private jsUtilityService: JsUtilityService,
  ) { }

  ngOnInit(): void {
    this.getClosingList();
  }

  getClosingList() {
    this.tableLoading = true;
    this.purchaseService.getClosingAll().subscribe(
      (response: ClosingModel[]) => {
        if(response) {
          this.totalRecords = response.length;
          this.closingList = response;
        }
      },
      (error: any) => {
        this.tableLoading = false;
        this.erpUtilityService.subscribeError(error, 'Unable to load data');
      },
      () => {
        setTimeout(() => (this.tableLoading = false));
      } 
    );
  }

  reset() {
    this.getClosingList();
  }
}
