import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { HttpResponseData } from 'src/app/erp/models/config/response.model';
import { forkJoin, Subject } from 'rxjs';
import { CustomerService } from 'src/app/erp/services/controller-services/customer.service';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { Sale, SaleHeader } from './../../../models/sale/sale';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { SaleService } from './../../../services/controller-services/sale.service';
import { AddSaleDialogComponent } from './../add-sale-dialog/add-sale-dialog.component';
import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { SaleHeaderList, SaleListSearchModel } from 'src/app/erp/models/sale/sale';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Table } from 'primeng/table';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent implements OnInit {
  @ViewChild('dt', { static: true }) dataTable: Table;
  @ViewChildren('row', { read: ElementRef }) rowElement: QueryList<ElementRef>;
  @ViewChild('createSaleDialog', { static: true })
  addSaleDialog: AddSaleDialogComponent;
  saleHeader: SaleHeader = new SaleHeader();
  saleList: SaleHeaderList[] = [];
  totalRecord: number;
  tableLoading: boolean;
  exportSearchModel: SaleListSearchModel;

  availableCustomerName: SelectItem[] = [];

  selectedId: number;
  selectedOrderDate: Date;
  selectedCustomerName: string[] = [];

  constructor(
    private saleService: SaleService,
    private erpUtilityService: ErpUtilityService,
    private customerService: CustomerService,
    private jsUtilityService: JsUtilityService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
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
    this.addSaleDialog.openDialog();
  }

  reset() {
    this.selectedCustomerName = [];
    this.selectedId = null;
    this.selectedOrderDate = null;
    this.dataTable.clear();
  }

  tableLazyLoadEvent(event: any) {
    console.log('event.filters =', event.filters)
    const inputModel = new SaleListSearchModel();
    inputModel.pageNumber = event.first / event.rows;
    inputModel.pagePerRow = event.rows;
    if (event.sortField) {
      inputModel.sortName = event.sortField;
      inputModel.sortOrder = event.sortOrder;
    } else {
      inputModel.sortName = 'orderDate';
      inputModel.sortOrder = 1;
    }
    if (event.filters && event.filters.id && event.filters.id.value) {
      inputModel.id = event.filters.id.value.trim();
    }
    if (event.filters && event.filters.customerName && event.filters.customerName.value) {
            inputModel.customerId = event.filters.customerName.value;
    }
    if (event.filters && event.filters.orderDate && event.filters.orderDate.value) {
      inputModel.orderDate = moment(this.selectedOrderDate).format('YYYY-MM-DD'); ;
    }
    this.getSaleHeaderListByLazyLoad(inputModel);
  }

  getSaleHeaderListByLazyLoad(inputParam: SaleListSearchModel) {
    console.log('enter sale')
    this.tableLoading = true;
    this.exportSearchModel = inputParam;
    this.saleService.getSaleHeadeListByLazyLoad(inputParam).subscribe(
      (response: SaleHeader) => {
        this.saleHeader = response;
        this.saleList = response.saleItemList;
      },(error: any) => {
            this.erpUtilityService.subscribeError(error, 'Unable to lost data');
          },
          () => {
            setTimeout(() => (this.tableLoading = false));
          } 
    );
  }

  edit(saleHeader: SaleHeaderList) {
    this.addSaleDialog.openDialog(saleHeader.id);
  }

  export() {
    this.erpUtilityService.showLoading('Downloading....')
    this.saleService.exportSaleHeader(this.exportSearchModel).subscribe(
      (res: any) => {
        this.jsUtilityService.fileSaveAs(res);
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(
          error,
          'Unable to download sale'
        );
      },
      () => {
        this.erpUtilityService.hideLoading();
      }
    );
  }

  delete(event: any, id: number) {
    event.preventDefault();
    this.confirmationService.confirm({
      key: 'globalConfirm',
      message: 'Are you sure that you want to delete?. Related payment records will be delete',
      header: 'Confirmation',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.erpUtilityService.showLoading('Deleteing...');
        this.saleService.delete(id).subscribe(
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
}
