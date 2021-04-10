jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CaisseService } from '../service/caisse.service';
import { ICaisse, Caisse } from '../caisse.model';

import { CaisseUpdateComponent } from './caisse-update.component';

describe('Component Tests', () => {
  describe('Caisse Management Update Component', () => {
    let comp: CaisseUpdateComponent;
    let fixture: ComponentFixture<CaisseUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let caisseService: CaisseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CaisseUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CaisseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CaisseUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      caisseService = TestBed.inject(CaisseService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const caisse: ICaisse = { id: 456 };

        activatedRoute.data = of({ caisse });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(caisse));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const caisse = { id: 123 };
        spyOn(caisseService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ caisse });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: caisse }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(caisseService.update).toHaveBeenCalledWith(caisse);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const caisse = new Caisse();
        spyOn(caisseService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ caisse });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: caisse }));
        saveSubject.complete();

        // THEN
        expect(caisseService.create).toHaveBeenCalledWith(caisse);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const caisse = { id: 123 };
        spyOn(caisseService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ caisse });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(caisseService.update).toHaveBeenCalledWith(caisse);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
