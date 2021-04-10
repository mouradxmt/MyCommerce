import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStock } from '../stock.model';

@Component({
  selector: 'jhi-stock-detail',
  templateUrl: './stock-detail.component.html',
})
export class StockDetailComponent implements OnInit {
  stock: IStock | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.stock = stock;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
