import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IStock, Stock } from '../stock.model';

import { StockService } from './stock.service';

describe('Service Tests', () => {
  describe('Stock Service', () => {
    let service: StockService;
    let httpMock: HttpTestingController;
    let elemDefault: IStock;
    let expectedResult: IStock | IStock[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(StockService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        dateEntree: currentDate,
        fournisseur: 'AAAAAAA',
        libelle: 'AAAAAAA',
        quantite: 0,
        montantAchatTTC: 0,
        datePaiement: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateEntree: currentDate.format(DATE_FORMAT),
            datePaiement: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Stock', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateEntree: currentDate.format(DATE_FORMAT),
            datePaiement: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEntree: currentDate,
            datePaiement: currentDate,
          },
          returnedFromService
        );

        service.create(new Stock()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Stock', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dateEntree: currentDate.format(DATE_FORMAT),
            fournisseur: 'BBBBBB',
            libelle: 'BBBBBB',
            quantite: 1,
            montantAchatTTC: 1,
            datePaiement: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEntree: currentDate,
            datePaiement: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Stock', () => {
        const patchObject = Object.assign(
          {
            libelle: 'BBBBBB',
            quantite: 1,
            montantAchatTTC: 1,
          },
          new Stock()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateEntree: currentDate,
            datePaiement: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Stock', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dateEntree: currentDate.format(DATE_FORMAT),
            fournisseur: 'BBBBBB',
            libelle: 'BBBBBB',
            quantite: 1,
            montantAchatTTC: 1,
            datePaiement: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEntree: currentDate,
            datePaiement: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Stock', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addStockToCollectionIfMissing', () => {
        it('should add a Stock to an empty array', () => {
          const stock: IStock = { id: 123 };
          expectedResult = service.addStockToCollectionIfMissing([], stock);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(stock);
        });

        it('should not add a Stock to an array that contains it', () => {
          const stock: IStock = { id: 123 };
          const stockCollection: IStock[] = [
            {
              ...stock,
            },
            { id: 456 },
          ];
          expectedResult = service.addStockToCollectionIfMissing(stockCollection, stock);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Stock to an array that doesn't contain it", () => {
          const stock: IStock = { id: 123 };
          const stockCollection: IStock[] = [{ id: 456 }];
          expectedResult = service.addStockToCollectionIfMissing(stockCollection, stock);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(stock);
        });

        it('should add only unique Stock to an array', () => {
          const stockArray: IStock[] = [{ id: 123 }, { id: 456 }, { id: 89868 }];
          const stockCollection: IStock[] = [{ id: 123 }];
          expectedResult = service.addStockToCollectionIfMissing(stockCollection, ...stockArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const stock: IStock = { id: 123 };
          const stock2: IStock = { id: 456 };
          expectedResult = service.addStockToCollectionIfMissing([], stock, stock2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(stock);
          expect(expectedResult).toContain(stock2);
        });

        it('should accept null and undefined values', () => {
          const stock: IStock = { id: 123 };
          expectedResult = service.addStockToCollectionIfMissing([], null, stock, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(stock);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
