import { CustomerService } from './../../../services/controller-services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ErpUtilityService } from 'src/app/erp/services/utility-services/erp-utility.service';
import { JsUtilityService } from 'src/app/erp/services/utility-services/js-utility.service';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { Customer } from 'src/app/erp/models/customer/customer';
import * as moment from 'moment';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild('createCustomerDialog', { static: true })
  addCustomerDialog: AddCustomerDialogComponent;
  customerList: Customer[] = [];
  tableLoading: boolean;
  totalRecords: number;
  constructor(    
    private customerService: CustomerService,
    private erpUtilityService: ErpUtilityService,
    private jsUtilityService: JsUtilityService,) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    this.tableLoading = true;
    this.customerService.getCustomerList().subscribe(
      (response: Customer[]) => {
        if(response) {
          this.totalRecords = response.length;
          this.customerList = response;
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
    this.getCustomerList();
  }

  create() {
   const customer = new Customer();
   this.addCustomerDialog.openDialog(customer);
  }

  edit(customer: Customer) {
    this.addCustomerDialog.openDialog(customer);
  }

}
