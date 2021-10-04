import { ErpUtilityService } from 'src/app/erp/services/utility-services/erp-utility.service';
import { ERPRoutes } from './../../models/routes/erp-routes';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private erpUtilityService: ErpUtilityService,
  ) { }

  ngOnInit(): void {
  }

  goToRoute(menu: string) {
    if(menu === 'Sale') {
      this.router.navigate([ERPRoutes.Sale]);
    } else if(menu === 'Purchase') {
      this.router.navigate([ERPRoutes.Purchase]);
    }
    else if(menu === 'Report') {
      this.erpUtilityService.showWarning('Warning','Not avaliable now, Comming soon');
    }
    else if(menu === 'Profit') {
      this.erpUtilityService.showWarning('Warning','Not avaliable now, Comming soon');
    }
   
  }
}
