import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICaisse } from '../caisse.model';

@Component({
  selector: 'jhi-caisse-detail',
  templateUrl: './caisse-detail.component.html',
})
export class CaisseDetailComponent implements OnInit {
  caisse: ICaisse | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caisse }) => {
      this.caisse = caisse;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
