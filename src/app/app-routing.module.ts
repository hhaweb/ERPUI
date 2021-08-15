import { Customer } from './demo/domain/customer';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { ERPRoutes } from './erp/models/routes/erp-routes';
const routes: Routes = [
    {
        path: '',
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
