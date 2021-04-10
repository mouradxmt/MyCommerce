import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduit } from '../produit.model';
import { ProduitService } from '../service/produit.service';
import { ProduitDeleteDialogComponent } from '../delete/produit-delete-dialog.component';

@Component({
  selector: 'jhi-produit',
  templateUrl: './produit.component.html',
})
export class ProduitComponent implements OnInit {
  produits?: IProduit[];
  isLoading = false;

  constructor(protected produitService: ProduitService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.produitService.query().subscribe(
      (res: HttpResponse<IProduit[]>) => {
        this.isLoading = false;
        this.produits = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProduit): number {
    return item.id!;
  }

  delete(produit: IProduit): void {
    const modalRef = this.modalService.open(ProduitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.produit = produit;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
