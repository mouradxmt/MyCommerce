import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICaisse, Caisse } from '../caisse.model';
import { CaisseService } from '../service/caisse.service';

@Injectable({ providedIn: 'root' })
export class CaisseRoutingResolveService implements Resolve<ICaisse> {
  constructor(protected service: CaisseService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICaisse> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((caisse: HttpResponse<Caisse>) => {
          if (caisse.body) {
            return of(caisse.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Caisse());
  }
}
