import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErpUtilityService } from '../../services/utility-services/erp-utility.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  dialogTitle = '';
  dialogContentHTML = '';
  dialogDisplay = false;

  confirmTitle = '';
  confirmContentHTML = '';

  constructor(
    private messageService: MessageService,
    private erpUtilityService: ErpUtilityService
  ) {
    this.erpUtilityService.displayDialogService.subscribe((input: any) => {
      this.displayDialog(input.title, input.contentHTML);
    });
  }

  displayDialog(title: string, contentHTML: string) {
    this.dialogTitle = title;
    this.dialogContentHTML = contentHTML;
    this.dialogDisplay = true;
  }

  close() {
    this.messageService.clear();
  }
}
