import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduit } from '../produit.model';

@Component({
  selector: 'jhi-produit-detail',
  templateUrl: './produit-detail.component.html',
})
export class ProduitDetailComponent implements OnInit {
  produit: IProduit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.produit = produit;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
