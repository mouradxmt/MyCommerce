jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IClient, Client } from '../client.model';
import { ClientService } from '../service/client.service';

import { ClientRoutingResolveService } from './client-routing-resolve.service';

describe('Service Tests', () => {
  describe('Client routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ClientRoutingResolveService;
    let service: ClientService;
    let resultClient: IClient | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ClientRoutingResolveService);
      service = TestBed.inject(ClientService);
      resultClient = undefined;
    });

    describe('resolve', () => {
      it('should return IClient returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultClient = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultClient).toEqual({ id: 123 });
      });

      it('should return new IClient if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultClient = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultClient).toEqual(new Client());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultClient = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultClient).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
