import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProduit, Produit } from '../produit.model';
import { ProduitService } from '../service/produit.service';
import { IVente } from 'app/entities/vente/vente.model';
import { VenteService } from 'app/entities/vente/service/vente.service';

@Component({
  selector: 'jhi-produit-update',
  templateUrl: './produit-update.component.html',
})
export class ProduitUpdateComponent implements OnInit {
  isSaving = false;

  ventesSharedCollection: IVente[] = [];

  editForm = this.fb.group({
    id: [],
    libelle: [],
    categorie: [],
    prixVente: [],
    prixAchat: [],
    tVA: [],
    vente: [],
  });

  constructor(
    protected produitService: ProduitService,
    protected venteService: VenteService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produit }) => {
      this.updateForm(produit);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produit = this.createFromForm();
    if (produit.id !== undefined) {
      this.subscribeToSaveResponse(this.produitService.update(produit));
    } else {
      this.subscribeToSaveResponse(this.produitService.create(produit));
    }
  }

  trackVenteById(index: number, item: IVente): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(produit: IProduit): void {
    this.editForm.patchValue({
      id: produit.id,
      libelle: produit.libelle,
      categorie: produit.categorie,
      prixVente: produit.prixVente,
      prixAchat: produit.prixAchat,
      tVA: produit.tVA,
      vente: produit.vente,
    });

    this.ventesSharedCollection = this.venteService.addVenteToCollectionIfMissing(this.ventesSharedCollection, produit.vente);
  }

  protected loadRelationshipsOptions(): void {
    this.venteService
      .query()
      .pipe(map((res: HttpResponse<IVente[]>) => res.body ?? []))
      .pipe(map((ventes: IVente[]) => this.venteService.addVenteToCollectionIfMissing(ventes, this.editForm.get('vente')!.value)))
      .subscribe((ventes: IVente[]) => (this.ventesSharedCollection = ventes));
  }

  protected createFromForm(): IProduit {
    return {
      ...new Produit(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      categorie: this.editForm.get(['categorie'])!.value,
      prixVente: this.editForm.get(['prixVente'])!.value,
      prixAchat: this.editForm.get(['prixAchat'])!.value,
      tVA: this.editForm.get(['tVA'])!.value,
      vente: this.editForm.get(['vente'])!.value,
    };
  }
}
