import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVente } from '../vente.model';
import { VenteService } from '../service/vente.service';

@Component({
  templateUrl: './vente-delete-dialog.component.html',
})
export class VenteDeleteDialogComponent {
  vente?: IVente;

  constructor(protected venteService: VenteService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.venteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
