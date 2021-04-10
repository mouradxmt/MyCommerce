jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { StockService } from '../service/stock.service';
import { IStock, Stock } from '../stock.model';

import { StockUpdateComponent } from './stock-update.component';

describe('Component Tests', () => {
  describe('Stock Management Update Component', () => {
    let comp: StockUpdateComponent;
    let fixture: ComponentFixture<StockUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let stockService: StockService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [StockUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(StockUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      stockService = TestBed.inject(StockService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const stock: IStock = { id: 456 };

        activatedRoute.data = of({ stock });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(stock));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const stock = { id: 123 };
        spyOn(stockService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ stock });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: stock }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(stockService.update).toHaveBeenCalledWith(stock);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const stock = new Stock();
        spyOn(stockService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ stock });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: stock }));
        saveSubject.complete();

        // THEN
        expect(stockService.create).toHaveBeenCalledWith(stock);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const stock = { id: 123 };
        spyOn(stockService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ stock });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(stockService.update).toHaveBeenCalledWith(stock);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
