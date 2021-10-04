import { forkJoin } from 'rxjs';
import { CommonService } from './../../../services/controller-services/common.service';
import { Supplier } from './../../../models/customer/customer';
import { HttpResponseData } from './../../../models/config/response.model';
import { ConfirmationService } from 'primeng/api';
import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddSupplierDialogComponent } from '../add-supplier-dialog/add-supplier-dialog.component';
import { CustomerService } from 'src/app/erp/services/controller-services/customer.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  @ViewChild('createSupplierDialog', { static: true })
  addSupplierDialog: AddSupplierDialogComponent;
  supplierList: Supplier[] = [];
  tableLoading: boolean;
  totalRecords: number;
  constructor(    
    private customerService: CustomerService,
    private erpUtilityService: ErpUtilityService,
    private jsUtilityService: JsUtilityService,
    private confirmationService: ConfirmationService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.getsupplierList();
    const getItemList = this.commonService.getCommonDropDownList('item');
    const getCustomerList = this.commonService.getCommonDropDownList('customer');
    const getSupplierList = this.commonService.getCommonDropDownList('supplier');

    forkJoin([getItemList, getCustomerList, getSupplierList]).subscribe(
      (data: any) => {
        console.log(data[0]);
        console.log(data[1]);
        console.log(data[2]);
      }
    );
  }

  getsupplierList() {
    this.tableLoading = true;
    this.customerService.getSupplierList().subscribe(
      (response: Supplier[]) => {
        if(response) {
          this.totalRecords = response.length;
          this.supplierList = response;
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
    this.getsupplierList();
  }

  create() {
   const supplier = new Supplier();
   this.addSupplierDialog.openDialog(supplier);
  }

  edit(supplier: Supplier) {
    this.addSupplierDialog.openDialog(supplier);
  }

  delete(event: any,id: number) {
    event.preventDefault();
    this.confirmationService.confirm({
      key: 'globalConfirm',
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.customerService.deleteSupplier(id).subscribe(
          (response: HttpResponseData) => {
            if(response.status) {
              this.erpUtilityService.showSuccess('Success','Delete Successfully');       
            } else {
              this.erpUtilityService.showWarning('Warning',response.message);
            }
            this.reset();
          },(error: any) => {
            this.erpUtilityService.subscribeError(error, 'Unable to detete supplier');
          },
          () => {
            setTimeout(() => (this.tableLoading = false));
          } 
        );
      },
    });
  }
}
