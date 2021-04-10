import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICaisse } from '../caisse.model';
import { CaisseService } from '../service/caisse.service';

@Component({
  templateUrl: './caisse-delete-dialog.component.html',
})
export class CaisseDeleteDialogComponent {
  caisse?: ICaisse;

  constructor(protected caisseService: CaisseService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.caisseService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
