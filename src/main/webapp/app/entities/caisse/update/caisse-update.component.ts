import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICaisse, Caisse } from '../caisse.model';
import { CaisseService } from '../service/caisse.service';

@Component({
  selector: 'jhi-caisse-update',
  templateUrl: './caisse-update.component.html',
})
export class CaisseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    argentRetraite: [],
    argentDepose: [],
    caisseAttendu: [],
  });

  constructor(protected caisseService: CaisseService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caisse }) => {
      this.updateForm(caisse);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const caisse = this.createFromForm();
    if (caisse.id !== undefined) {
      this.subscribeToSaveResponse(this.caisseService.update(caisse));
    } else {
      this.subscribeToSaveResponse(this.caisseService.create(caisse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICaisse>>): void {
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

  protected updateForm(caisse: ICaisse): void {
    this.editForm.patchValue({
      id: caisse.id,
      argentRetraite: caisse.argentRetraite,
      argentDepose: caisse.argentDepose,
      caisseAttendu: caisse.caisseAttendu,
    });
  }

  protected createFromForm(): ICaisse {
    return {
      ...new Caisse(),
      id: this.editForm.get(['id'])!.value,
      argentRetraite: this.editForm.get(['argentRetraite'])!.value,
      argentDepose: this.editForm.get(['argentDepose'])!.value,
      caisseAttendu: this.editForm.get(['caisseAttendu'])!.value,
    };
  }
}
