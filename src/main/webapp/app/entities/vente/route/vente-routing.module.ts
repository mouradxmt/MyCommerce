import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VenteComponent } from '../list/vente.component';
import { VenteDetailComponent } from '../detail/vente-detail.component';
import { VenteUpdateComponent } from '../update/vente-update.component';
import { VenteRoutingResolveService } from './vente-routing-resolve.service';

const venteRoute: Routes = [
  {
    path: '',
    component: VenteComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VenteDetailComponent,
    resolve: {
      vente: VenteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VenteUpdateComponent,
    resolve: {
      vente: VenteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VenteUpdateComponent,
    resolve: {
      vente: VenteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(venteRoute)],
  exports: [RouterModule],
})
export class VenteRoutingModule {}
