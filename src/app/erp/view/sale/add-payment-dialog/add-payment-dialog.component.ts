import { CustomerService } from './../../../services/controller-services/customer.service';
import { HttpResponseData } from './../../../models/config/response.model';
import { PanelModule } from 'primeng/panel';
import { Customer } from './../../../models/customer/customer';
import { Payment } from 'src/app/erp/models/sale/sale';
import { SaleService } from './../../../services/controller-services/sale.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { ItemService } from './../../../services/controller-services/item-service.service';
import { CommonService } from './../../../services/controller-services/common.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-add-payment-dialog',
  templateUrl: './add-payment-dialog.component.html',
  styleUrls: ['./add-payment-dialog.component.scss']
})
export class AddPaymentDialogComponent implements OnInit {
  @Output() 
  RefreshListEvent = new EventEmitter();
  showDialog: boolean;
  payment: Payment = new Payment();
  selectedCustomer: Customer;
  customerSuggestList: Customer[];
  previousTotalCredit: number;
  payAmount = 0;
  selectedPayDate: Date;
  constructor(
    private commonService: CommonService,
    private erpUtilityService: ErpUtilityService,
    private saleService: SaleService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.selectedPayDate = new Date();
  }

  openDialog(paymentId: number = null) {
    if (paymentId) {
      this.getPaymentById(paymentId);
    } else {
      this.payment = new Payment();
      this.payAmount = 0;
    }
    this.showDialog = true;
  }

  cancel() {
    this.showDialog = false;
    this.payment = new Payment();
    this.selectedPayDate = new Date();
    this.selectedCustomer = null;
    this.customerSuggestList = [];
    this.previousTotalCredit = 0;
    this.showDialog = false;
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
    this.getTotalCredit(this.selectedCustomer.id);
  }

  getCustomerById(Id: number) {
    this.customerService.getCustomerById(Id).subscribe(
      (response: Customer) => {
        if(response) {
          this.selectedCustomer = response;
          this.getTotalCredit(response.id);
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to load customer');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }

  getPaymentById(paymentId: number) {
    this.saleService.getPayentById(paymentId).subscribe(
      (response: Payment) => {
        if(response) {
          this.payment = response;
          this.getCustomerById(this.payment.customerId);
        }
      }, (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to load payment');
      }, () => {
        this.erpUtilityService.hideLoading();
      }
    );
  }

  save() {
    if(!this.selectedCustomer) {
      this.erpUtilityService.showWarning('Warning', 'Please add customer');
      return;
    }

    if(this.payAmount <= 0) {
      this.erpUtilityService.showWarning('Warning', 'Please add pay amount');
      return;
    }

    this.payment.customerId = this.selectedCustomer.id;
    this.payment.payDate = moment(this.selectedPayDate).format('YYYY-MM-DD ');
    this.payment.payAmount = this.payAmount;
    this.erpUtilityService.showLoading('Saving');
    this.saleService.savePayment(this.payment).subscribe(
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

  getTotalCredit(customerId: number) {
    this.commonService.getTotalCredit(customerId).subscribe(
      (response: number) => {
        this.previousTotalCredit = response;
      }
    );
  }
}
