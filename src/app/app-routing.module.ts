import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ERPRoutes } from './erp/models/routes/erp-routes';
const routes: Routes = [
    { path: '', redirectTo: ERPRoutes.Login, pathMatch: 'full' },
    {
        path: ERPRoutes.Login,
        loadChildren: () =>
          import('./erp/view/login/login.module').then((m) => m.LoginModule),
    },
    
    {
        path: ERPRoutes.Home,
        loadChildren: () =>
            import('./erp/view/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: ERPRoutes.Customer,
        loadChildren: () =>
            import('./erp/view/customer/customer.module').then((m) => m.CustomerModule),
    },  
    {
        path: ERPRoutes.Item,
        loadChildren: () =>
            import('./erp/view/item/item.module').then((m) => m.ItemModule),
    },
    {
        path: ERPRoutes.Sale,
        loadChildren: () =>
            import('./erp/view/sale/sale.module').then((m) => m.SaleModule),
    }, 
    {
        path: ERPRoutes.Purchase,
        loadChildren: () =>
            import('./erp/view/purchase/purchase.module').then((m) => m.PurchaseModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
