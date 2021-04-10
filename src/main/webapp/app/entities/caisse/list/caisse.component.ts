import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICaisse } from '../caisse.model';
import { CaisseService } from '../service/caisse.service';
import { CaisseDeleteDialogComponent } from '../delete/caisse-delete-dialog.component';

@Component({
  selector: 'jhi-caisse',
  templateUrl: './caisse.component.html',
})
export class CaisseComponent implements OnInit {
  caisses?: ICaisse[];
  isLoading = false;

  constructor(protected caisseService: CaisseService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.caisseService.query().subscribe(
      (res: HttpResponse<ICaisse[]>) => {
        this.isLoading = false;
        this.caisses = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICaisse): number {
    return item.id!;
  }

  delete(caisse: ICaisse): void {
    const modalRef = this.modalService.open(CaisseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.caisse = caisse;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
