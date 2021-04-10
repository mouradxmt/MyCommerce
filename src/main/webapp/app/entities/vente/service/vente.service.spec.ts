import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IVente, Vente } from '../vente.model';

import { VenteService } from './vente.service';

describe('Service Tests', () => {
  describe('Vente Service', () => {
    let service: VenteService;
    let httpMock: HttpTestingController;
    let elemDefault: IVente;
    let expectedResult: IVente | IVente[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(VenteService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        dateVente: currentDate,
        nomRevendeur: 'AAAAAAA',
        modePaiement: 'AAAAAAA',
        montantVente: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateVente: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Vente', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateVente: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );

        service.create(new Vente()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Vente', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dateVente: currentDate.format(DATE_FORMAT),
            nomRevendeur: 'BBBBBB',
            modePaiement: 'BBBBBB',
            montantVente: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Vente', () => {
        const patchObject = Object.assign(
          {
            nomRevendeur: 'BBBBBB',
            modePaiement: 'BBBBBB',
          },
          new Vente()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Vente', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            dateVente: currentDate.format(DATE_FORMAT),
            nomRevendeur: 'BBBBBB',
            modePaiement: 'BBBBBB',
            montantVente: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateVente: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Vente', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addVenteToCollectionIfMissing', () => {
        it('should add a Vente to an empty array', () => {
          const vente: IVente = { id: 123 };
          expectedResult = service.addVenteToCollectionIfMissing([], vente);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(vente);
        });

        it('should not add a Vente to an array that contains it', () => {
          const vente: IVente = { id: 123 };
          const venteCollection: IVente[] = [
            {
              ...vente,
            },
            { id: 456 },
          ];
          expectedResult = service.addVenteToCollectionIfMissing(venteCollection, vente);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Vente to an array that doesn't contain it", () => {
          const vente: IVente = { id: 123 };
          const venteCollection: IVente[] = [{ id: 456 }];
          expectedResult = service.addVenteToCollectionIfMissing(venteCollection, vente);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(vente);
        });

        it('should add only unique Vente to an array', () => {
          const venteArray: IVente[] = [{ id: 123 }, { id: 456 }, { id: 8966 }];
          const venteCollection: IVente[] = [{ id: 123 }];
          expectedResult = service.addVenteToCollectionIfMissing(venteCollection, ...venteArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const vente: IVente = { id: 123 };
          const vente2: IVente = { id: 456 };
          expectedResult = service.addVenteToCollectionIfMissing([], vente, vente2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(vente);
          expect(expectedResult).toContain(vente2);
        });

        it('should accept null and undefined values', () => {
          const vente: IVente = { id: 123 };
          expectedResult = service.addVenteToCollectionIfMissing([], null, vente, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(vente);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
