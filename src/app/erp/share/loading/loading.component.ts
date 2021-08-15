import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingBarModel } from '../../models/config/config.model';
import { ErpUtilityService } from '../../services/utility-services/erp-utility.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  loadingMessage: string;
  showCancelButton: boolean;
  showLoading: boolean;
  cancelAction: () => void;
  subscription: Subscription;

  constructor(private erpUtilityService: ErpUtilityService) {}

  ngOnInit() {
    this.showLoading = false;
    this.subscribeToLoadingChange();
  }

  subscribeToLoadingChange() {
    this.subscription = this.erpUtilityService.loadingChange.subscribe(
      (loadingBarModel: LoadingBarModel) => {
        this.showLoading = loadingBarModel.showLoading;
        this.loadingMessage = loadingBarModel.loadingMessage;
        this.showCancelButton = loadingBarModel.showCancelButton;
        this.cancelAction = loadingBarModel.cancelAction;
      }
    );
  }

  cancelClick() {
    this.cancelAction();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
