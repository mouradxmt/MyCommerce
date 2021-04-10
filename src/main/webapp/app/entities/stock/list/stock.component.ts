import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStock } from '../stock.model';
import { StockService } from '../service/stock.service';
import { StockDeleteDialogComponent } from '../delete/stock-delete-dialog.component';

@Component({
  selector: 'jhi-stock',
  templateUrl: './stock.component.html',
})
export class StockComponent implements OnInit {
  stocks?: IStock[];
  isLoading = false;

  constructor(protected stockService: StockService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.stockService.query().subscribe(
      (res: HttpResponse<IStock[]>) => {
        this.isLoading = false;
        this.stocks = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IStock): number {
    return item.id!;
  }

  delete(stock: IStock): void {
    const modalRef = this.modalService.open(StockDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.stock = stock;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
