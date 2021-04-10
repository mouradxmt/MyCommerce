import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CaisseComponent } from './list/caisse.component';
import { CaisseDetailComponent } from './detail/caisse-detail.component';
import { CaisseUpdateComponent } from './update/caisse-update.component';
import { CaisseDeleteDialogComponent } from './delete/caisse-delete-dialog.component';
import { CaisseRoutingModule } from './route/caisse-routing.module';

@NgModule({
  imports: [SharedModule, CaisseRoutingModule],
  declarations: [CaisseComponent, CaisseDetailComponent, CaisseUpdateComponent, CaisseDeleteDialogComponent],
  entryComponents: [CaisseDeleteDialogComponent],
})
export class CaisseModule {}
