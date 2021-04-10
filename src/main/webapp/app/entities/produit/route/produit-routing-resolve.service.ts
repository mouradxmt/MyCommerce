import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProduit, Produit } from '../produit.model';
import { ProduitService } from '../service/produit.service';

@Injectable({ providedIn: 'root' })
export class ProduitRoutingResolveService implements Resolve<IProduit> {
  constructor(protected service: ProduitService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((produit: HttpResponse<Produit>) => {
          if (produit.body) {
            return of(produit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Produit());
  }
}
