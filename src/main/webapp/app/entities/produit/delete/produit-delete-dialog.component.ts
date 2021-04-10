import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduit } from '../produit.model';
import { ProduitService } from '../service/produit.service';

@Component({
  templateUrl: './produit-delete-dialog.component.html',
})
export class ProduitDeleteDialogComponent {
  produit?: IProduit;

  constructor(protected produitService: ProduitService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produitService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
