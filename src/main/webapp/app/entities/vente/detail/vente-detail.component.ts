import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVente } from '../vente.model';

@Component({
  selector: 'jhi-vente-detail',
  templateUrl: './vente-detail.component.html',
})
export class VenteDetailComponent implements OnInit {
  vente: IVente | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vente }) => {
      this.vente = vente;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
