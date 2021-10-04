import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { HttpResponseData } from 'src/app/erp/models/config/response.model';
import { PurchaseService } from './../../../services/controller-services/purchase.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { CustomerService } from './../../../services/controller-services/customer.service';
import { Supplier } from './../../../models/customer/customer';
import { PurchasePayment } from './../../../models/purchase/purchase';
import { CommonService } from 'src/app/erp/services/controller-services/common.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-add-purchase-payment-dialog',
  templateUrl: './add-purchase-payment-dialog.component.html',
  styleUrls: ['./add-purchase-payment-dialog.component.scss']
})
export class AddPurchasePaymentDialogComponent implements OnInit {

  @Output() 
  RefreshListEvent = new EventEmitter();
  showDialog: boolean;
  payment: PurchasePayment = new PurchasePayment();
  selectedSupplier: Supplier;
  supplierSuggestList: Supplier[];
  previousTotalCredit: number;
  payAmount = 0;
  selectedPayDate: Date;
  constructor(
    private commonService: CommonService,
    private erpUtilityService: ErpUtilityService,
    private purchaseService: PurchaseService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.selectedPayDate = new Date();
  }

  openDialog(id: number = null) {
    this.showDialog = true;
    if (id) {
      this.getPurchasePaymentById(id);
    } else {
      this.payment = new PurchasePayment();
    }
  }

  getPurchasePaymentById(purchasePaymentId: number) {
    this.erpUtilityService.showLoading('Loading...')
    this.purchaseService.getPurchasePaymentById(purchasePaymentId).subscribe(
      (response: PurchasePayment) => {
        if(response) {
          this.payment = response;
          this.payAmount = this.payment.payAmount;
          this.selectedPayDate = new Date(this.payment.payDate);
          const supplier = new Supplier();
          supplier.id = this.payment.supplierId;
          supplier.name = this.payment.supplierName;
          this.selectedSupplier = supplier;
          this.getTotalCredit(response.supplierId);
        }
      }, (error) => {
        this.erpUtilityService.subscribeError(error, 'Unable to load payment');

      }, () => {
        this.erpUtilityService.hideLoading();
      }
    );
  }

  cancel() {
    this.showDialog = false;
    this.payment = new PurchasePayment();
    this.selectedPayDate = new Date();
    this.selectedSupplier = null;
    this.supplierSuggestList = [];
    this.previousTotalCredit = 0;
    this.showDialog = false;
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
    this.getTotalCredit(this.selectedSupplier.id);
  }

  getSupplierById(Id: number) {
    this.customerService.getSupplierById(Id).subscribe(
      (response: Supplier) => {
        if(response) {
          this.selectedSupplier = response;
          this.getTotalCredit(response.id);
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to load supplier');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }

  save() {
    if(!this.selectedSupplier) {
      this.erpUtilityService.showWarning('Warning', 'Please add supplier');
      return;
    }

    if(this.payAmount == 0) {
      this.erpUtilityService.showWarning('Warning', 'Please add payment');
      return;
    }

    this.payment.supplierId = this.selectedSupplier.id;
    this.payment.payDate = moment(this.selectedPayDate).format('YYYY-MM-DD ');
    this.payment.payAmount = this.payAmount;
    this.erpUtilityService.showLoading('Saving');
    console.log('save paymnet', this.payment)
    this.purchaseService.savePurchasePayment(this.payment).subscribe(
      (response: HttpResponseData) => {
        if(response.status) {
          this.erpUtilityService.showSuccess('Success','Save Successfully');
          this.showDialog = false;
          this.RefreshListEvent.emit();
        } else {
          this.erpUtilityService.showWarning('Warning',response.message);
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save payment');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }

  changeValue(payAmount: number) {
    if(this.previousTotalCredit > 0) {
      this.previousTotalCredit = this.previousTotalCredit - payAmount;
    } else if(payAmount > this.previousTotalCredit) {
      this.previousTotalCredit = 0;
    }
  }

  getTotalCredit(supplierId: number) {
    this.commonService.getTotalPurchaseCredit(supplierId).subscribe(
      (response: number) => {
        this.previousTotalCredit = response;
        console.log('previous purchase total credit',this.previousTotalCredit)
      }
    );
  }

}
