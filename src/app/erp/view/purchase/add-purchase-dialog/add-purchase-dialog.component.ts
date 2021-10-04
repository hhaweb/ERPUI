import { HttpResponseData } from 'src/app/erp/models/config/response.model';
import { forkJoin } from 'rxjs';
import { PurchaseService } from './../../../services/controller-services/purchase.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { ItemService } from './../../../services/controller-services/item-service.service';
import { CommonService } from './../../../services/controller-services/common.service';
import { ClosingModel, PurchaseItem } from './../../../models/purchase/purchase';
import { SelectItemType } from './../../../models/item/item';
import { Supplier } from './../../../models/customer/customer';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Purchase } from 'src/app/erp/models/purchase/purchase';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SaleItem } from 'src/app/erp/models/sale/sale';
@Component({
  selector: 'app-add-purchase-dialog',
  templateUrl: './add-purchase-dialog.component.html',
  styleUrls: ['./add-purchase-dialog.component.scss']
})
export class AddPurchaseDialogComponent implements OnInit {

  @Output() 
  RefreshListEvent = new EventEmitter();
  showDialog: boolean;
  supplierSuggestList: Supplier[];
  availabelItemLsit: SelectItemType[] = [];
  // originalItemList: SelectItemType[] = [];
  selectedSupplier: Supplier;
  purchase: Purchase = new Purchase();
  purchaseItem: PurchaseItem[] = [];
  selectedPurchaseDate: Date;
  addBtnDisable = false;
  totalAmount = 0;
  payAmount = 0;
  creditAmount = 0;
  previousTotalCredit = 0;
  isComplete: boolean;
  closing: ClosingModel[] = [];

  constructor(
    private commonService: CommonService,
    private itemService: ItemService,
    private erpUtilityService: ErpUtilityService,
    private purchaseService: PurchaseService,
    ) { }

  ngOnInit(): void {
    this.selectedPurchaseDate = new Date();
    const getItemList = this.itemService.getItemList();
    forkJoin([getItemList]).subscribe((results) => {
      if(results[0] && results[0].length > 0) {
        results[0].forEach(x => {
          this.availabelItemLsit.push({
            label: x.name,
            value: x.id,
            price: x.buyPrice,
            disabled: false
          })
        });
      }
    });
  }

  getSupplierAutoComplete(event: any) {
    const query = event.query;
    this.commonService.getSupplierByName(query).subscribe(
      (response: Supplier[]) => {
        this.supplierSuggestList = response;
      },(error: any) => {
       // this.erpUtilityService.subscribeError(error, 'Unable to detete customer');
      },
      () => {
       // setTimeout(() => (this.tableLoading = false));
      } 

    );
  }

  selectSupplier(event: any) {
    console.log('this. =',this.selectedSupplier);
    this.getTotalCredit(this.selectedSupplier.id);
  }

  getTotalCredit(supplierId: number) {
    this.commonService.getTotalPurchaseCredit(supplierId).subscribe(
      (response: number) => {
        this.previousTotalCredit = response;
      }
    );
  }

  openDialog(purchaseId: number = null) {
    this.showDialog = true;
    this.getAllClosing();
    if(purchaseId) {
      this.getPurchaseById(purchaseId);
    }
  }

  cancel() {
    this.addBtnDisable = false;
    this.purchase = new Purchase();
    this.closing = [];
    this.purchaseItem = [];
    this.selectedSupplier = new Supplier();
    this.supplierSuggestList = [];
    this.showDialog = false;
    this.totalAmount = 0;
    this.payAmount = 0;
    this.creditAmount = 0;
    this.previousTotalCredit = 0;
    this.availabelItemLsit.map(a => a.disabled = false);
  }

  save() {
    if(!this.selectedSupplier) {
      this.erpUtilityService.showWarning('Warrny', 'Please add supplier');
      return;
    }
    if(this.purchaseItem.length == 0) {
      this.erpUtilityService.showWarning('Warrny', 'Please add item');
      return;
    }
    this.purchase.supplierId = this.selectedSupplier.id;
    this.purchase.purchaseItemDtoList = this.purchaseItem;
    this.purchase.purchaseDate = moment(this.selectedPurchaseDate).format('YYYY-MM-DD ');
    console.log('Saving ', this.purchase);
    this.callSaveApi(this.purchase);
  }

  callSaveApi(purchase: Purchase) {
    this.purchaseService.savePurchase(purchase).subscribe(
      (response: HttpResponseData) => {
        if(response.status) {
          this.erpUtilityService.showSuccess('Success','Save Successfully');
          this.RefreshListEvent.emit();
          this.cancel();
        } else {
          this.erpUtilityService.showWarning('Warning',response.message);
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save purchase');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );

  }

  selectItem(item: PurchaseItem) {
    this.availabelItemLsit.map(x => {
      if(x.label == item.itemName) {
        x.disabled = false;
      } 
    });   
    const selectedItem = this.availabelItemLsit.filter(x => x.value == item.itemId)[0];
    item.itemName = selectedItem.label;
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
      const item = new PurchaseItem();
      const firstItem = this.availabelItemLsit.filter(x => !x.disabled)[0];
      item.itemId = firstItem.value;
      item.itemName = firstItem.label;
      item.price = firstItem.price;
      item.qty = 1;
      item.total = item.qty * item.price;
      const closing = this.closing.filter(a => a.itemId === item.itemId);
      item.closingQty = closing.length > 0 ? closing[0].qty : 0;
      this.purchaseItem.push(item);
      this.availabelItemLsit.map(x => {
        if(x == firstItem) {
          x.disabled = true;
        }
      })
      const dd =  this.availabelItemLsit.filter(x => !x.disabled).length;
      this.addBtnDisable = this.availabelItemLsit.filter(x => !x.disabled).length > 0 ? false : true;
      this.calculateAmount();
    }
  }

  removeItem(item: PurchaseItem) {
    this.payAmount = 0;
    this.isComplete = false;
    this.purchaseItem = this.purchaseItem.filter(x => x !== item);
    this.availabelItemLsit.map(x => {
      if(x.value == item.itemId) {
        x.disabled = false;
        this.addBtnDisable = false;
      }
    });
    this.calculateAmount();
    if(this.purchaseItem.length == 0) {
      this.totalAmount = 0;
      this.payAmount = 0;
      this.creditAmount = 0;
    }
  }

  changeValue(item: PurchaseItem) {
    item.total = item.qty * item.price;
    const closing = this.closing.filter(a => a.itemId === item.itemId);
    item.closingQty = closing.length > 0 ? closing[0].qty  : 0;
    this.calculateAmount();
  }

  calculateAmount() {
    this.totalAmount = 0;
    this.purchaseItem.map(a => {
      this.totalAmount += a.total;
    })
    this.creditAmount = this.totalAmount - this.payAmount;
    this.purchase.payAmount = this.payAmount;
  }

  makeComplete() {
    if(this.isComplete) {
      this.payAmount = this.totalAmount;
    } else {
      this.payAmount = 0;
    }
    this.calculateAmount();
  }

  getPurchaseById(purchaseId: number) {
    this.purchaseService.getPurchaseById(purchaseId).subscribe(
      (response: Purchase) => {
        this.purchase = response;
        this.purchaseItem = response.purchaseItemDtoList;
        this.selectedPurchaseDate = new Date(response.purchaseDate);
        this.payAmount = response.payAmount;
        this.creditAmount = response.creditAmount;
        this.totalAmount = response.buyTotal;
        const supplier = new Supplier();
        supplier.id = response.supplierId;
        supplier.name = response.supplierName;
        this.selectedSupplier = supplier;
        this.previousTotalCredit = response.previousCreditAmount;
        this.purchaseItem.map(x => {
          const closing = this.closing.filter(a => a.itemId === x.itemId);
          x.closingQty = closing.length > 0 ? closing[0].qty : 0;
        });
        console.log('purchase =', this.purchase);
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save purchase');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }

  getAllClosing() {
    this.purchaseService.getClosingAll().subscribe(
      (response: ClosingModel[]) => {
        if(response.length > 0) {
          this.closing = response;
        }
      }, (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to load closing');

      }, () => {

      }
    );
  }
}
