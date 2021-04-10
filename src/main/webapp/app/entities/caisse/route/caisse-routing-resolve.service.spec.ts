jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ICaisse, Caisse } from '../caisse.model';
import { CaisseService } from '../service/caisse.service';

import { CaisseRoutingResolveService } from './caisse-routing-resolve.service';

describe('Service Tests', () => {
  describe('Caisse routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: CaisseRoutingResolveService;
    let service: CaisseService;
    let resultCaisse: ICaisse | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(CaisseRoutingResolveService);
      service = TestBed.inject(CaisseService);
      resultCaisse = undefined;
    });

    describe('resolve', () => {
      it('should return ICaisse returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCaisse = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCaisse).toEqual({ id: 123 });
      });

      it('should return new ICaisse if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCaisse = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultCaisse).toEqual(new Caisse());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultCaisse = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultCaisse).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
