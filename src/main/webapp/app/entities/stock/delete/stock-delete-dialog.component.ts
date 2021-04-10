import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStock } from '../stock.model';
import { StockService } from '../service/stock.service';

@Component({
  templateUrl: './stock-delete-dialog.component.html',
})
export class StockDeleteDialogComponent {
  stock?: IStock;

  constructor(protected stockService: StockService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stockService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
