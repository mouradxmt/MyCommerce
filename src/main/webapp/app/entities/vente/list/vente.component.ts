import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVente } from '../vente.model';
import { VenteService } from '../service/vente.service';
import { VenteDeleteDialogComponent } from '../delete/vente-delete-dialog.component';

@Component({
  selector: 'jhi-vente',
  templateUrl: './vente.component.html',
})
export class VenteComponent implements OnInit {
  ventes?: IVente[];
  isLoading = false;

  constructor(protected venteService: VenteService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.venteService.query().subscribe(
      (res: HttpResponse<IVente[]>) => {
        this.isLoading = false;
        this.ventes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IVente): number {
    return item.id!;
  }

  delete(vente: IVente): void {
    const modalRef = this.modalService.open(VenteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vente = vente;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
