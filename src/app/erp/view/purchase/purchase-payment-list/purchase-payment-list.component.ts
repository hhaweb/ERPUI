import { HttpResponseData } from 'src/app/erp/models/config/response.model';
import { forkJoin } from 'rxjs';
import { PurchaseService } from './../../../services/controller-services/purchase.service';
import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { CustomerService } from './../../../services/controller-services/customer.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { AddPurchasePaymentDialogComponent } from './../add-purchase-payment-dialog/add-purchase-payment-dialog.component';
import { PurchasePaymentList, PurchaseListSearchModel } from './../../../models/purchase/purchase';
import { Payment } from './../../../models/sale/sale';
import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment'
@Component({
  selector: 'app-purchase-payment-list',
  templateUrl: './purchase-payment-list.component.html',
  styleUrls: ['./purchase-payment-list.component.scss']
})
export class PurchasePaymentListComponent implements OnInit {
  paymentList: PurchasePaymentList[] = [];
  totalPayAmount: number = 0;
  @ViewChild('dt', { static: true }) dataTable: Table;
  @ViewChildren('row', { read: ElementRef }) rowElement: QueryList<ElementRef>;

  @ViewChild('createPaymentDialog', { static: true })
  createPaymentDialog: AddPurchasePaymentDialogComponent;
  exportSearchModel: PurchaseListSearchModel;
  totalRecord: number;
  tableLoading: boolean;
  availableSupplierName: SelectItem[] = [];
  availableType: SelectItem[] = [];
  selectedId: number;
  selectedPayDate: Date;
  selectedCustomerName: string[] = [];
  selectedRemark: string;
  selectedType: string[] = [];
  constructor(
    private purchaseService: PurchaseService,
    private erpUtilityService: ErpUtilityService,
    private customerService: CustomerService,
    private jsUtilityService: JsUtilityService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.availableType = [
      {label: 'Purchase', value: 'Purchase'},
      {label: 'Payment', value: 'Payment'}
    ]
    const getCustomerList = this.customerService.getSupplierList();
    forkJoin([getCustomerList]).subscribe((results) => {
      if(results[0] && results[0].length > 0) {
        results[0].forEach(x => {
          this.availableSupplierName.push({
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
  }

  tableLazyLoadEvent(event: any) {
    console.log('event.filters =', event.filters)
    const inputModel = new PurchaseListSearchModel();
    inputModel.pageNumber = event.first / event.rows;
    inputModel.pagePerRow = event.rows;
    if (event.sortField) {
      inputModel.sortName = event.sortField;
      inputModel.sortOrder = event.sortOrder;
    } else {
      inputModel.sortName = 'payDate';
      inputModel.sortOrder = 1;
    }
    if (event.filters && event.filters.supplierName && event.filters.supplierName.value) {
        inputModel.supplierId = event.filters.supplierName.value;
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

  getPaymentListByLazyLoad(inputParam: PurchaseListSearchModel) {
    this.exportSearchModel = inputParam;
    this.paymentList = [];
    this.totalPayAmount = 0;
    this.purchaseService.getPurchasePaymetnByLazyLoad(inputParam).subscribe(
      (response: PurchasePaymentList[]) => {
        if(response.length > 0) {
          this.paymentList = response;
          let totalPay = 0
          this.paymentList.map(x => {
            x.type = x.purchaseId ? 'Purchase' : 'Payment';
            totalPay += x.payAmount;
          });
          this.totalPayAmount = totalPay;
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
        this.purchaseService.deletePurchasePayment(id).subscribe(
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
    // this.purchaseService.exportPayment(this.exportSearchModel).subscribe(
    //   (res: any) => {
    //     this.jsUtilityService.fileSaveAs(res);
    //   },
    //   (error: any) => {
    //     this.erpUtilityService.subscribeError(
    //       error,
    //       'Unable to download payment'
    //     );
    //   },
    //   () => {
    //     this.erpUtilityService.hideLoading();
    //   }
    // );
  }
}
