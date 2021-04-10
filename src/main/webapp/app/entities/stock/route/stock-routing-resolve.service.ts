import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStock, Stock } from '../stock.model';
import { StockService } from '../service/stock.service';

@Injectable({ providedIn: 'root' })
export class StockRoutingResolveService implements Resolve<IStock> {
  constructor(protected service: StockService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStock> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((stock: HttpResponse<Stock>) => {
          if (stock.body) {
            return of(stock.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Stock());
  }
}
