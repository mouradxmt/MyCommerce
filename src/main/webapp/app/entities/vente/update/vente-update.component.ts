import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IVente, Vente } from '../vente.model';
import { VenteService } from '../service/vente.service';
import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';

@Component({
  selector: 'jhi-vente-update',
  templateUrl: './vente-update.component.html',
})
export class VenteUpdateComponent implements OnInit {
  isSaving = false;

  clientsSharedCollection: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    dateVente: [],
    nomRevendeur: [],
    modePaiement: [],
    montantVente: [],
    client: [],
  });

  constructor(
    protected venteService: VenteService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vente }) => {
      this.updateForm(vente);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vente = this.createFromForm();
    if (vente.id !== undefined) {
      this.subscribeToSaveResponse(this.venteService.update(vente));
    } else {
      this.subscribeToSaveResponse(this.venteService.create(vente));
    }
  }

  trackClientById(index: number, item: IClient): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVente>>): void {
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

  protected updateForm(vente: IVente): void {
    this.editForm.patchValue({
      id: vente.id,
      dateVente: vente.dateVente,
      nomRevendeur: vente.nomRevendeur,
      modePaiement: vente.modePaiement,
      montantVente: vente.montantVente,
      client: vente.client,
    });

    this.clientsSharedCollection = this.clientService.addClientToCollectionIfMissing(this.clientsSharedCollection, vente.client);
  }

  protected loadRelationshipsOptions(): void {
    this.clientService
      .query()
      .pipe(map((res: HttpResponse<IClient[]>) => res.body ?? []))
      .pipe(map((clients: IClient[]) => this.clientService.addClientToCollectionIfMissing(clients, this.editForm.get('client')!.value)))
      .subscribe((clients: IClient[]) => (this.clientsSharedCollection = clients));
  }

  protected createFromForm(): IVente {
    return {
      ...new Vente(),
      id: this.editForm.get(['id'])!.value,
      dateVente: this.editForm.get(['dateVente'])!.value,
      nomRevendeur: this.editForm.get(['nomRevendeur'])!.value,
      modePaiement: this.editForm.get(['modePaiement'])!.value,
      montantVente: this.editForm.get(['montantVente'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }
}
