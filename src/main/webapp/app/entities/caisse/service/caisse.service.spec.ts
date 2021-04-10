import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICaisse, Caisse } from '../caisse.model';

import { CaisseService } from './caisse.service';

describe('Service Tests', () => {
  describe('Caisse Service', () => {
    let service: CaisseService;
    let httpMock: HttpTestingController;
    let elemDefault: ICaisse;
    let expectedResult: ICaisse | ICaisse[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CaisseService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        argentRetraite: 0,
        argentDepose: 0,
        caisseAttendu: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Caisse', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Caisse()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Caisse', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            argentRetraite: 1,
            argentDepose: 1,
            caisseAttendu: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Caisse', () => {
        const patchObject = Object.assign(
          {
            argentRetraite: 1,
          },
          new Caisse()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Caisse', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            argentRetraite: 1,
            argentDepose: 1,
            caisseAttendu: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Caisse', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCaisseToCollectionIfMissing', () => {
        it('should add a Caisse to an empty array', () => {
          const caisse: ICaisse = { id: 123 };
          expectedResult = service.addCaisseToCollectionIfMissing([], caisse);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(caisse);
        });

        it('should not add a Caisse to an array that contains it', () => {
          const caisse: ICaisse = { id: 123 };
          const caisseCollection: ICaisse[] = [
            {
              ...caisse,
            },
            { id: 456 },
          ];
          expectedResult = service.addCaisseToCollectionIfMissing(caisseCollection, caisse);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Caisse to an array that doesn't contain it", () => {
          const caisse: ICaisse = { id: 123 };
          const caisseCollection: ICaisse[] = [{ id: 456 }];
          expectedResult = service.addCaisseToCollectionIfMissing(caisseCollection, caisse);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(caisse);
        });

        it('should add only unique Caisse to an array', () => {
          const caisseArray: ICaisse[] = [{ id: 123 }, { id: 456 }, { id: 88991 }];
          const caisseCollection: ICaisse[] = [{ id: 123 }];
          expectedResult = service.addCaisseToCollectionIfMissing(caisseCollection, ...caisseArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const caisse: ICaisse = { id: 123 };
          const caisse2: ICaisse = { id: 456 };
          expectedResult = service.addCaisseToCollectionIfMissing([], caisse, caisse2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(caisse);
          expect(expectedResult).toContain(caisse2);
        });

        it('should accept null and undefined values', () => {
          const caisse: ICaisse = { id: 123 };
          expectedResult = service.addCaisseToCollectionIfMissing([], null, caisse, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(caisse);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
