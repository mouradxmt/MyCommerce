jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProduitService } from '../service/produit.service';
import { IProduit, Produit } from '../produit.model';
import { IVente } from 'app/entities/vente/vente.model';
import { VenteService } from 'app/entities/vente/service/vente.service';

import { ProduitUpdateComponent } from './produit-update.component';

describe('Component Tests', () => {
  describe('Produit Management Update Component', () => {
    let comp: ProduitUpdateComponent;
    let fixture: ComponentFixture<ProduitUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let produitService: ProduitService;
    let venteService: VenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProduitUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProduitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduitUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      produitService = TestBed.inject(ProduitService);
      venteService = TestBed.inject(VenteService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Vente query and add missing value', () => {
        const produit: IProduit = { id: 456 };
        const vente: IVente = { id: 31599 };
        produit.vente = vente;

        const venteCollection: IVente[] = [{ id: 27744 }];
        spyOn(venteService, 'query').and.returnValue(of(new HttpResponse({ body: venteCollection })));
        const additionalVentes = [vente];
        const expectedCollection: IVente[] = [...additionalVentes, ...venteCollection];
        spyOn(venteService, 'addVenteToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ produit });
        comp.ngOnInit();

        expect(venteService.query).toHaveBeenCalled();
        expect(venteService.addVenteToCollectionIfMissing).toHaveBeenCalledWith(venteCollection, ...additionalVentes);
        expect(comp.ventesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const produit: IProduit = { id: 456 };
        const vente: IVente = { id: 38401 };
        produit.vente = vente;

        activatedRoute.data = of({ produit });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(produit));
        expect(comp.ventesSharedCollection).toContain(vente);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const produit = { id: 123 };
        spyOn(produitService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ produit });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: produit }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(produitService.update).toHaveBeenCalledWith(produit);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const produit = new Produit();
        spyOn(produitService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ produit });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: produit }));
        saveSubject.complete();

        // THEN
        expect(produitService.create).toHaveBeenCalledWith(produit);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const produit = { id: 123 };
        spyOn(produitService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ produit });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(produitService.update).toHaveBeenCalledWith(produit);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackVenteById', () => {
        it('Should return tracked Vente primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackVenteById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
