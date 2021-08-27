import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpResponseData } from 'src/app/erp/models/config/response.model';
import { Customer } from 'src/app/erp/models/customer/customer';
import { CustomerService } from 'src/app/erp/services/controller-services/customer.service';
import { ErpUtilityService } from 'src/app/erp/services/utility-services/erp-utility.service';
import { JsUtilityService } from 'src/app/erp/services/utility-services/js-utility.service';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

  showDialog: boolean;
  customer: Customer = new Customer();

  @Output() 
  RefreshListEvent = new EventEmitter();

  constructor(
    private erpUtilityService: ErpUtilityService,
    private jsUtilityService: JsUtilityService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }
 
  save() {
    if(!this.customer.name) {
      this.erpUtilityService.showWarning('Warning', 'Please add name');
      return;
    }
    this.erpUtilityService.showLoading('Saving');
    this.customerService.saveCustomer(this.customer).subscribe(
      (response: HttpResponseData) => {
        if(response.status) {
          this.erpUtilityService.showSuccess('Success','Save Successfully');
          this.showDialog = false;
          this.RefreshListEvent.emit();
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save customer');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }

  openDialog(inputModel: Customer) {
    this.showDialog = true;
    this.customer = inputModel;
  }

  cancel() {
    this.showDialog = false;
  }
}
