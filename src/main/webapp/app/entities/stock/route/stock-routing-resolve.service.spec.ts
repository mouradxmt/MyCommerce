jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IStock, Stock } from '../stock.model';
import { StockService } from '../service/stock.service';

import { StockRoutingResolveService } from './stock-routing-resolve.service';

describe('Service Tests', () => {
  describe('Stock routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: StockRoutingResolveService;
    let service: StockService;
    let resultStock: IStock | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(StockRoutingResolveService);
      service = TestBed.inject(StockService);
      resultStock = undefined;
    });

    describe('resolve', () => {
      it('should return IStock returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultStock = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultStock).toEqual({ id: 123 });
      });

      it('should return new IStock if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultStock = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultStock).toEqual(new Stock());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultStock = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultStock).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
