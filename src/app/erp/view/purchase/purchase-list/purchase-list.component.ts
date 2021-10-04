import { HttpResponseData } from 'src/app/erp/models/config/response.model';
import { AddPurchaseDialogComponent } from './../add-purchase-dialog/add-purchase-dialog.component';
import { forkJoin } from 'rxjs';
import { Table } from 'primeng/table';
import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { CustomerService } from './../../../services/controller-services/customer.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { PurchaseService } from './../../../services/controller-services/purchase.service';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { PurchaseHeader, PurchaseHeaderList, PurchaseListSearchModel } from './../../../models/purchase/purchase';
import { Component, OnInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  @ViewChild('dt', { static: true }) dataTable: Table;
  @ViewChildren('row', { read: ElementRef }) rowElement: QueryList<ElementRef>;

  @ViewChild('purchaseDialog', { static: true })
  purchaseDialog: AddPurchaseDialogComponent;

  purchaseHeader: PurchaseHeader = new PurchaseHeader();
  purchaseList: PurchaseHeaderList[] = [];

  selectedId: number;
  selectedPurchaseDate: Date;
  selectedSupplierName: string[] = [];
  availableSupplierName: SelectItem[] = [];
  tableLoading: boolean;
  totalRecord: number;

  constructor(
    private purchaseService: PurchaseService,
    private erpUtilityService: ErpUtilityService,
    private customerService: CustomerService,
    private jsUtilityService: JsUtilityService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
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

  getPurchaseHeaderList(inputModel: PurchaseListSearchModel) {
    console.log('enter')
    this.tableLoading = true;
    this.purchaseService.getPurchaseHeaderByLazyLoad(inputModel).subscribe(
      (response: PurchaseHeader) => {
        this.purchaseHeader = response;
        this.purchaseList = response.purchaseHeaderList;
      }, (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to lost data');
        this.tableLoading = false;
      },() => {
        this.tableLoading = false;
      }
    );
  }

  tableLazyLoadEvent(event: any) {
    const inputModel = new PurchaseListSearchModel();
    inputModel.pageNumber = event.first / event.rows;
    inputModel.pagePerRow = event.rows;
    if (event.sortField) {
      inputModel.sortName = event.sortField;
      inputModel.sortOrder = event.sortOrder;
    } else {
      inputModel.sortName = 'purchaseDate';
      inputModel.sortOrder = 1;
    }
    if (event.filters && event.filters.id && event.filters.id.value) {
      inputModel.purchaseId = event.filters.id.value.trim();
    }
    if (event.filters && event.filters.supplierName && event.filters.supplierName.value) {
      inputModel.supplierId = event.filters.supplierName.value;
    }
    if (event.filters && event.filters.purchaseDate && event.filters.purchaseDate.value) {
      inputModel.purchaseDate = moment(this.selectedPurchaseDate).format('YYYY-MM-DD'); ;
    }
    this.getPurchaseHeaderList(inputModel);
  }

  edit(purchase: PurchaseHeaderList) {
    this.purchaseDialog.openDialog(purchase.purchaseId);
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
        this.purchaseService.deletePurchase(id).subscribe(
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

  create() {
    this.purchaseDialog.openDialog();
  }

  export() {

  }

  reset() {
    this.selectedSupplierName = [];
    this.selectedId = null;
    this.selectedPurchaseDate = null;
   this.dataTable.clear();
  }
}
