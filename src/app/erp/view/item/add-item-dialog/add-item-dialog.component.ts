import { HttpResponseData } from './../../../models/config/response.model';
import { ErpUtilityService } from './../../../services/utility-services/erp-utility.service';
import { ItemService } from './../../../services/controller-services/item-service.service';
import { JsUtilityService } from './../../../services/utility-services/js-utility.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/erp/models/item/item';
import * as _ from 'lodash';
@Component({
  selector: 'add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  showDialog: boolean;
  idTextBoxDisable: boolean;
  idPlaceHolderText = 'test';
  item: Item = new Item();

  @Output() 
  RefreshListEvent = new EventEmitter();

  constructor(
    private erpUtilityService: ErpUtilityService,
    private jsUtilityService: JsUtilityService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
  }
 
  save() {
    if(!this.item.name) {
      this.erpUtilityService.showWarning('Warning', 'Please add name');
      return;
    }
    this.erpUtilityService.showLoading('Saving');
    this.itemService.saveItem(this.item).subscribe(
      (response: HttpResponseData) => {
        if(response.status) {
          this.erpUtilityService.showSuccess('Success','Save Successfully');
          this.showDialog = false;
          this.RefreshListEvent.emit();
        }
      },
      (error: any) => {
        this.erpUtilityService.subscribeError(error, 'Unable to save item');
      },
      () => {
        this.erpUtilityService.hideLoading();
      } 
    );
  }

  openDialog(inputModel: Item) {
    this.showDialog = true;
    console.log('before =', this.item)
    this.item = inputModel;
    console.log('input', this.item)
    if(this.item.Id == 0) {
      this.idPlaceHolderText = 'TBA';
      this.idTextBoxDisable = true;
    } else {
      this.idTextBoxDisable = false;
    }
  }

  cancel() {
    this.showDialog = false;
  }
}
