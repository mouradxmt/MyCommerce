import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProduitComponent } from '../list/produit.component';
import { ProduitDetailComponent } from '../detail/produit-detail.component';
import { ProduitUpdateComponent } from '../update/produit-update.component';
import { ProduitRoutingResolveService } from './produit-routing-resolve.service';

const produitRoute: Routes = [
  {
    path: '',
    component: ProduitComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProduitDetailComponent,
    resolve: {
      produit: ProduitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProduitUpdateComponent,
    resolve: {
      produit: ProduitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProduitUpdateComponent,
    resolve: {
      produit: ProduitRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(produitRoute)],
  exports: [RouterModule],
})
export class ProduitRoutingModule {}
