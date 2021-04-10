import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { StockComponent } from './list/stock.component';
import { StockDetailComponent } from './detail/stock-detail.component';
import { StockUpdateComponent } from './update/stock-update.component';
import { StockDeleteDialogComponent } from './delete/stock-delete-dialog.component';
import { StockRoutingModule } from './route/stock-routing.module';

@NgModule({
  imports: [SharedModule, StockRoutingModule],
  declarations: [StockComponent, StockDetailComponent, StockUpdateComponent, StockDeleteDialogComponent],
  entryComponents: [StockDeleteDialogComponent],
})
export class StockModule {}
