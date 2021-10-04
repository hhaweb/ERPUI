import { PurchaseService } from './../../../services/controller-services/purchase.service';
import { ClosingModel } from './../../../models/purchase/purchase';
import { HttpResponseData } from './../../../models/config/response.model';
import { SaleService } from './../../../services/controller-services/sale.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { AddItemDialogComponent } from './../../item/add-item-dialog/add-item-dialog.component';
import { ItemService } from './../../../services/controller-services/item-service.service';
import { forkJoin } from 'rxjs';
import { SelectItemType } from './../../../models/item/item';
import { Sale, SaleItem } from './../../../models/sale/sale';
import { Customer } from './../../../models/customer/customer';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonService } from 'src/app/erp/services/controller-services/common.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-add-sale-dialog',
  templateUrl: './add-sale-dialog.component.html',
  styleUrls: ['./add-sale-dialog.component.scss']
})
export class AddSaleDialogComponent implements OnInit {
  @Output() 
  RefreshListEvent = new EventEmitter();
  showDialog: boolean;
  customerSuggestList: Customer[];
  availabelItemLsit: SelectItemType[] = [];
  selectedCustomer: Customer;
  sale: Sale = new Sale();
  saleItem: SaleItem[] = [];
  selectedOrderDate: Date;
  addBtnDisable = false;
  totalAmount = 0;
  payAmount = 0;
  creditAmount = 0;
  previousTotalCredit = 0;
  isComplete: boolean;
  closing: ClosingModel[];
  isNew: boolean;

  constructor(
    private commonService: CommonService,
    private itemService: ItemService,
    private erpUtilityService: ErpUtilityService,
    private saleService: SaleService,
    private purchaseService: PurchaseService,

    ) { }

  ngOnInit(): void {
    this.selectedOrderDate = new Date();
    const getItemList = this.itemService.getItemList(true);
    forkJoin([getItemList]).subscribe((results) => {
      if(results[0] && results[0].length > 0) {
        results[0].forEach(x => {
          this.availabelItemLsit.push({
            label: x.name,
            value: x.id,
            price: x.sellPrice,
            disabled: false
          })
        });
      }
    });
  }

  getAllClosing() {
    this.purchaseService.getClosingAll().subscribe(
      (response: ClosingModel[]) => {
        this.closing = response;
      }, (error: any) => {

      }, () => {

      }
    );
  }

  getCustomerAutoComplete(event: any) {
    const query = event.query;
    this.commonService.getCustoemrByName(query).subscribe(
      (response: Customer[]) => {
        this.customerSuggestList = response;
      },(error: any) => {
       // this.erpUtilityService.subscribeError(error, 'Unable to detete customer');
      },
      () => {
       // setTimeout(() => (this.tableLoading = false));
      } 

    );
  }

  selectCustomer(event: any) {
    console.log('this. =',this.selectedCustomer);
    this.getTotalCredit(this.selectedCustomer.id);
  }

  getTotalCredit(customerId: number) {
    this.commonService.getTotalCredit(customerId).subscribe(
      (response: number) => {
        this.previousTotalCredit = response;
      }
    );
  }

  openDialog(saleId: number = null) {
    this.getAllClosing();
    this.showDialog = true;
    if(saleId) {
      this.isNew = false;
      this.getSaleById(saleId);
    } else {
      this.isNew = true;
    }
  }

  cancel() {
    this.addBtnDisable = false;
    this.sale = new Sale();
    this.saleItem = [];
    this.selectedCustomer = new Customer();
    this.customerSuggestList = [];
    this.showDialog = false;
    this.totalAmount = 0;
    this.payAmount = 0;
    this.creditAmount = 0;
    this.previousTotalCredit = 0;
    this.availabelItemLsit.map(a => a.disabled = false);
  }

  save() {
    if(!this.selectedCustomer) {
      this.erpUtilityService.showWarning('Warrny', 'Please add customer');
      return;
    }
    if(this.saleItem.length == 0) {
      this.erpUtilityService.showWarning('Warrny', 'Please add item');
      return;
    }
    this.sale.customerId = this.selectedCustomer.id;
    this.sale.saleItemListDto = this.saleItem;
    this.sale.orderDate = moment(this.selectedOrderDate).format('YYYY-MM-DD ');
    console.log('Saving ', this.sale);
    this.callSaveApi(this.sale);
  }

  callSaveApi(sale: Sale) {
    this.saleService.saveSale(sale).subscribe(
      (response: HttpResponseData) => {
        if(response.status) {
          this.erpUtilityService.showSuccess('Success','Save Successfully');
          this.RefreshListEvent.emit();
          this.cancel();
        }else {
          this.erpUtilityService.showWarning('Warning',response.message);
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save sale');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );

  }

  selectItem(item: SaleItem) {
    this.availabelItemLsit.map(x => {
      if(x.label == item.name) {
        x.disabled = false;
      }
    });
    const selectedItem = this.availabelItemLsit.filter(x => x.value == item.itemId)[0];
    item.qty = 0;
    item.name = selectedItem.label;
    item.price = selectedItem.price;
    item.total = item.qty * item.price;
    const closing = this.closing.filter(a => a.itemId === item.itemId);
    item.closingQty = closing.length > 0 ? closing[0].qty : 0;
    this.calculateAmount();
  }

  addNewItem() {
    if(this.availabelItemLsit.length > 0) {
      this.payAmount = 0;
      this.isComplete = false;
      const item = new SaleItem();
      const firstItem = this.availabelItemLsit.filter(x => !x.disabled)[0];
      item.itemId = firstItem.value;
      item.name = firstItem.label;
      item.price = firstItem.price;
      item.qty = 0;
      item.total = item.qty * item.price;
      this.saleItem.push(item);
      this.availabelItemLsit.map(x => {
        if(x == firstItem) {
          x.disabled = true;
        }
      })
      const closing = this.closing.filter(a => a.itemId === item.itemId && a.qty > 0);
      item.closingQty = closing.length > 0 ? closing[0].qty : 0;
      this.addBtnDisable = this.availabelItemLsit.filter(x => !x.disabled).length > 0 ? false : true;
      this.calculateAmount();
    } else {
      this.erpUtilityService.showWarning('Warrny', 'There is no closing');
    }
  }

  removeItem(item: SaleItem) {
    this.payAmount = 0;
    this.isComplete = false;
    this.saleItem = this.saleItem.filter(x => x !== item);
    this.availabelItemLsit.map(x => {
      if(x.value == item.itemId) {
        x.disabled = false;
        this.addBtnDisable = false;
      }
    });
    this.calculateAmount();
    if(this.saleItem.length == 0) {
      this.totalAmount = 0;
      this.payAmount = 0;
      this.creditAmount = 0;
    }
  }

  changeValue(item: SaleItem) {
    item.total = item.qty * item.price;
    this.calculateAmount();
  }

  calculateAmount() {
    this.totalAmount = 0;
    this.saleItem.map(a => {
      this.totalAmount += a.total;
    })
    this.creditAmount = this.totalAmount - this.payAmount;
    this.sale.payAmount = this.payAmount;
  }

  makeComplete() {
    if(this.isComplete) {
      this.payAmount = this.totalAmount;
    } else {
      this.payAmount = 0;
    }
    this.calculateAmount();
  }

  getSaleById(saleId: number) {
    this.saleService.getSaleById(saleId).subscribe(
      (response: Sale) => {
        this.sale = response;
        this.saleItem = response.saleItemListDto;
        this.saleItem.map(x => {
          const closing = this.closing.filter(a => a.itemId === x.itemId);
          x.closingQty = closing.length > 0 ? closing[0].qty : 0;
        });
        this.selectedOrderDate = new Date(response.orderDate);
        this.payAmount = response.payAmount;
        this.creditAmount = response.creditAmount;
        this.totalAmount = response.totalAmount;
        this.selectedCustomer = response.customer;
        this.previousTotalCredit = response.totalCreditAmount;
        console.log('Sale =', this.sale);
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save sale');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }
}
