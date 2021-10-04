import { HttpResponseData } from './../../../models/config/response.model';
import { forkJoin, zip } from 'rxjs';
import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { CustomerService } from './../../../services/controller-services/customer.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { SaleService } from './../../../services/controller-services/sale.service';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { AddPaymentDialogComponent } from './../add-payment-dialog/add-payment-dialog.component';
import { Table } from 'primeng/table';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Payment, PaymentList, PaymentSearchModel } from 'src/app/erp/models/sale/sale';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  paymentList: Payment[] = [];
  totalPayAmount: number = 0;
  @ViewChild('dt', { static: true }) dataTable: Table;
  @ViewChildren('row', { read: ElementRef }) rowElement: QueryList<ElementRef>;

  @ViewChild('createPaymentDialog', { static: true })
  createPaymentDialog: AddPaymentDialogComponent;
  exportSearchModel: PaymentSearchModel;
  totalRecord: number;
  tableLoading: boolean;
  availableCustomerName: SelectItem[] = [];
  availableType: SelectItem[] = [];
  selectedId: number;
  selectedPayDate: Date;
  selectedCustomerName: string[] = [];
  selectedRemark: string;
  selectedType: string[] = [];
  constructor(
    private saleService: SaleService,
    private erpUtilityService: ErpUtilityService,
    private customerService: CustomerService,
    private jsUtilityService: JsUtilityService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.availableType = [
      {label: 'Sale', value: 'Sale'},
      {label: 'Payment', value: 'Payment'}
    ]
    const getCustomerList = this.customerService.getCustomerList();
    forkJoin([getCustomerList]).subscribe((results) => {
      if(results[0] && results[0].length > 0) {
        results[0].forEach(x => {
          this.availableCustomerName.push({
            label: x.name,
            value: x.id
          })
        });
      }
    });
    this.reset();
  }


  create() {
    this.createPaymentDialog.openDialog();
  }

  reset() {
    this.selectedCustomerName = [];
    this.selectedType = [];
    this.selectedId = null;
    this.selectedPayDate = null;
    this.dataTable.reset();
    // const inputModel = new PaymentSearchModel();
    // inputModel.pageNumber = 0;
    // inputModel.pagePerRow = 100;
    // inputModel.sortName = 'payDate';
    // inputModel.sortOrder = 0;
    // this.getPaymentListByLazyLoad(inputModel);
  }

  tableLazyLoadEvent(event: any) {
    console.log('event.filters =', event.filters)
    const inputModel = new PaymentSearchModel();
    inputModel.pageNumber = event.first / event.rows;
    inputModel.pagePerRow = event.rows;
    if (event.sortField) {
      inputModel.sortName = event.sortField;
      inputModel.sortOrder = event.sortOrder;
    } else {
      inputModel.sortName = 'payDate';
      inputModel.sortOrder = 1;
    }
    if (event.filters && event.filters.id && event.filters.id.value) {
      inputModel.id = event.filters.id.value.trim();
    }
    if (event.filters && event.filters.customerName && event.filters.customerName.value) {
        inputModel.customerId = event.filters.customerName.value;
    }
    if (event.filters && event.filters.payDate && event.filters.payDate.value) {
      inputModel.payDate = moment(this.selectedPayDate).format('YYYY-MM-DD'); ;
    }
    if (event.filters && event.filters.remark && event.filters.remark.value) {
      inputModel.remark = event.filters.remark.value.trim();
    }
    if (event.filters && event.filters.type && event.filters.type.value) {
      inputModel.type = event.filters.type.value;
    }
    this.getPaymentListByLazyLoad(inputModel);
  }

  getPaymentListByLazyLoad(inputParam: PaymentSearchModel) {
    this.exportSearchModel = inputParam;
    this.paymentList = [];
    this.totalPayAmount = 0;
    this.saleService.getPaymentListByLazyLoad(inputParam).subscribe(
      (response: PaymentList) => {
        if(response.paymentList.length > 0) {
          this.paymentList = response.paymentList;
          this.paymentList.map(x => {
            x.type = x.saleId ? 'Sale' : 'Payment';
          });
          this.totalPayAmount = response.totalPayAmount;
          console.log('pay list', this.paymentList);
        }

      },(error: any) => {
            this.erpUtilityService.subscribeError(error, 'Unable to lost data');
          },
          () => {
            setTimeout(() => (this.tableLoading = false));
          } 
    );
  }

  edit(payment: Payment) {
    this.createPaymentDialog.openDialog(payment.paymentId);
  }

  delete(event: any, id: number) {
    event.preventDefault();
    this.confirmationService.confirm({
      key: 'globalConfirm',
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.erpUtilityService.showLoading('Deleteing...');
        this.saleService.deletePayment(id).subscribe(
          (response: HttpResponseData) => {
            if(response.status) {
              this.erpUtilityService.showSuccess('Success','Delete Successfully');       
            } else {
              this.erpUtilityService.showWarning('Warning',response.message);
            }
            this.reset();
          },
          (error: any) => {
            this.erpUtilityService.subscribeError(error, 'Unable to delete sale');
          },
          () => {
            this.erpUtilityService.hideLoading();
          } 
        );
      },
    });
  }

  export() {
    this.erpUtilityService.showLoading('Downloading...')
    this.saleService.exportPayment(this.exportSearchModel).subscribe(
      (res: any) => {
        this.jsUtilityService.fileSaveAs(res);
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(
          error,
          'Unable to download payment'
        );
      },
      () => {
        this.erpUtilityService.hideLoading();
      }
    );
  }

}
