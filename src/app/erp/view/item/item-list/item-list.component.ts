import { HttpResponseData } from './../../../models/config/response.model';
import { AddItemDialogComponent } from './../add-item-dialog/add-item-dialog.component';
import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { ItemService } from './../../../services/controller-services/item-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/erp/models/item/item';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @ViewChild('createItemDialog', { static: true })
  addItemDialog: AddItemDialogComponent;

  itemList: Item[] = [];
  tableLoading: boolean;
  totalRecords: number;
  constructor(
    private itemServices: ItemService,
    private erpUtilityService: ErpUtilityService,
    private jsUtilityService: JsUtilityService,
    private confirmationService: ConfirmationService
    
    ) { }

  ngOnInit(): void {
    this.getItemList();
  }

  getItemList() {
    this.tableLoading = true;
    this.itemServices.getItemList().subscribe(
      (response: Item[]) => {
        if(response) {
          this.totalRecords = response.length;
          this.itemList = response;
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
    this.getItemList();
  }

  create() {
   const item = new Item();
   this.addItemDialog.openDialog(item);
  }

  edit(item: Item) {
    this.addItemDialog.openDialog(item);
  }

  delete(event: any, id: number) {
    event.preventDefault();
    this.confirmationService.confirm({
      key: 'globalConfirm',
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.itemServices.deleteItem(id).subscribe(
          (response: HttpResponseData) => {
            if(response.status) {
              this.erpUtilityService.showSuccess('Success','Delete Successfully');
            } else {
              this.erpUtilityService.showWarning('Warning',response.message);
            }
            this.reset();
          },(error: any) => {
            this.erpUtilityService.subscribeError(error, 'Unable to detete customer');
          },
          () => {
            setTimeout(() => (this.tableLoading = false));
          } 
        );
      },
    });
  }
}
