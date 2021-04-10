import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StockComponent } from '../list/stock.component';
import { StockDetailComponent } from '../detail/stock-detail.component';
import { StockUpdateComponent } from '../update/stock-update.component';
import { StockRoutingResolveService } from './stock-routing-resolve.service';

const stockRoute: Routes = [
  {
    path: '',
    component: StockComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StockDetailComponent,
    resolve: {
      stock: StockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StockUpdateComponent,
    resolve: {
      stock: StockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StockUpdateComponent,
    resolve: {
      stock: StockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stockRoute)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
