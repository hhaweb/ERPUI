import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { HttpResponseData } from './../../../models/config/response.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'src/app/erp/services/controller-services/customer.service';
import { Supplier } from 'src/app/erp/models/customer/customer';

@Component({
  selector: 'app-add-supplier-dialog',
  templateUrl: './add-supplier-dialog.component.html',
  styleUrls: ['./add-supplier-dialog.component.scss']
})
export class AddSupplierDialogComponent implements OnInit {


  showDialog: boolean;
  supplier: Supplier = new Supplier();

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
    if(!this.supplier.name) {
      this.erpUtilityService.showWarning('Warning', 'Please add name');
      return;
    }
    this.erpUtilityService.showLoading('Saving');
    this.customerService.saveSupplier(this.supplier).subscribe(
      (response: HttpResponseData) => {
        if(response.status) {
          this.erpUtilityService.showSuccess('Success','Save Successfully');
          this.showDialog = false;
          this.RefreshListEvent.emit();
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save supplier');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }

  openDialog(inputModel: Supplier) {
    this.showDialog = true;
    this.supplier = inputModel;
  }

  cancel() {
    this.showDialog = false;
  }
}
