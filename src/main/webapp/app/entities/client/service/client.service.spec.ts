import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IClient, Client } from '../client.model';

import { ClientService } from './client.service';

describe('Service Tests', () => {
  describe('Client Service', () => {
    let service: ClientService;
    let httpMock: HttpTestingController;
    let elemDefault: IClient;
    let expectedResult: IClient | IClient[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ClientService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nom: 'AAAAAAA',
        prenom: 'AAAAAAA',
        mail: 'AAAAAAA',
        telephone: 'AAAAAAA',
        localisation: 'AAAAAAA',
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

      it('should create a Client', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Client()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Client', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            mail: 'BBBBBB',
            telephone: 'BBBBBB',
            localisation: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Client', () => {
        const patchObject = Object.assign(
          {
            mail: 'BBBBBB',
            telephone: 'BBBBBB',
            localisation: 'BBBBBB',
          },
          new Client()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Client', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            mail: 'BBBBBB',
            telephone: 'BBBBBB',
            localisation: 'BBBBBB',
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

      it('should delete a Client', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addClientToCollectionIfMissing', () => {
        it('should add a Client to an empty array', () => {
          const client: IClient = { id: 123 };
          expectedResult = service.addClientToCollectionIfMissing([], client);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(client);
        });

        it('should not add a Client to an array that contains it', () => {
          const client: IClient = { id: 123 };
          const clientCollection: IClient[] = [
            {
              ...client,
            },
            { id: 456 },
          ];
          expectedResult = service.addClientToCollectionIfMissing(clientCollection, client);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Client to an array that doesn't contain it", () => {
          const client: IClient = { id: 123 };
          const clientCollection: IClient[] = [{ id: 456 }];
          expectedResult = service.addClientToCollectionIfMissing(clientCollection, client);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(client);
        });

        it('should add only unique Client to an array', () => {
          const clientArray: IClient[] = [{ id: 123 }, { id: 456 }, { id: 26169 }];
          const clientCollection: IClient[] = [{ id: 123 }];
          expectedResult = service.addClientToCollectionIfMissing(clientCollection, ...clientArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const client: IClient = { id: 123 };
          const client2: IClient = { id: 456 };
          expectedResult = service.addClientToCollectionIfMissing([], client, client2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(client);
          expect(expectedResult).toContain(client2);
        });

        it('should accept null and undefined values', () => {
          const client: IClient = { id: 123 };
          expectedResult = service.addClientToCollectionIfMissing([], null, client, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(client);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
