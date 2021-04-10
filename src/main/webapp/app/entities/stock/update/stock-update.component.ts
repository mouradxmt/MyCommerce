import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IStock, Stock } from '../stock.model';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'jhi-stock-update',
  templateUrl: './stock-update.component.html',
})
export class StockUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    dateEntree: [],
    fournisseur: [],
    libelle: [],
    quantite: [],
    montantAchatTTC: [],
    datePaiement: [],
  });

  constructor(protected stockService: StockService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.updateForm(stock);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stock = this.createFromForm();
    if (stock.id !== undefined) {
      this.subscribeToSaveResponse(this.stockService.update(stock));
    } else {
      this.subscribeToSaveResponse(this.stockService.create(stock));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStock>>): void {
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

  protected updateForm(stock: IStock): void {
    this.editForm.patchValue({
      id: stock.id,
      dateEntree: stock.dateEntree,
      fournisseur: stock.fournisseur,
      libelle: stock.libelle,
      quantite: stock.quantite,
      montantAchatTTC: stock.montantAchatTTC,
      datePaiement: stock.datePaiement,
    });
  }

  protected createFromForm(): IStock {
    return {
      ...new Stock(),
      id: this.editForm.get(['id'])!.value,
      dateEntree: this.editForm.get(['dateEntree'])!.value,
      fournisseur: this.editForm.get(['fournisseur'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      quantite: this.editForm.get(['quantite'])!.value,
      montantAchatTTC: this.editForm.get(['montantAchatTTC'])!.value,
      datePaiement: this.editForm.get(['datePaiement'])!.value,
    };
  }
}
