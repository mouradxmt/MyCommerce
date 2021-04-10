import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ProduitComponent } from './list/produit.component';
import { ProduitDetailComponent } from './detail/produit-detail.component';
import { ProduitUpdateComponent } from './update/produit-update.component';
import { ProduitDeleteDialogComponent } from './delete/produit-delete-dialog.component';
import { ProduitRoutingModule } from './route/produit-routing.module';

@NgModule({
  imports: [SharedModule, ProduitRoutingModule],
  declarations: [ProduitComponent, ProduitDetailComponent, ProduitUpdateComponent, ProduitDeleteDialogComponent],
  entryComponents: [ProduitDeleteDialogComponent],
})
export class ProduitModule {}
