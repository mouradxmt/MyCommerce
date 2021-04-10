import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CaisseComponent } from '../list/caisse.component';
import { CaisseDetailComponent } from '../detail/caisse-detail.component';
import { CaisseUpdateComponent } from '../update/caisse-update.component';
import { CaisseRoutingResolveService } from './caisse-routing-resolve.service';

const caisseRoute: Routes = [
  {
    path: '',
    component: CaisseComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CaisseDetailComponent,
    resolve: {
      caisse: CaisseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CaisseUpdateComponent,
    resolve: {
      caisse: CaisseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CaisseUpdateComponent,
    resolve: {
      caisse: CaisseRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(caisseRoute)],
  exports: [RouterModule],
})
export class CaisseRoutingModule {}
