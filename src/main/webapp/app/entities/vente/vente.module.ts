import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { VenteComponent } from './list/vente.component';
import { VenteDetailComponent } from './detail/vente-detail.component';
import { VenteUpdateComponent } from './update/vente-update.component';
import { VenteDeleteDialogComponent } from './delete/vente-delete-dialog.component';
import { VenteRoutingModule } from './route/vente-routing.module';

@NgModule({
  imports: [SharedModule, VenteRoutingModule],
  declarations: [VenteComponent, VenteDetailComponent, VenteUpdateComponent, VenteDeleteDialogComponent],
  entryComponents: [VenteDeleteDialogComponent],
})
export class VenteModule {}
