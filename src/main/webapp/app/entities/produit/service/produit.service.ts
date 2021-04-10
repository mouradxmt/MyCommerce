import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProduit, getProduitIdentifier } from '../produit.model';

export type EntityResponseType = HttpResponse<IProduit>;
export type EntityArrayResponseType = HttpResponse<IProduit[]>;

@Injectable({ providedIn: 'root' })
export class ProduitService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/produits');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(produit: IProduit): Observable<EntityResponseType> {
    return this.http.post<IProduit>(this.resourceUrl, produit, { observe: 'response' });
  }

  update(produit: IProduit): Observable<EntityResponseType> {
    return this.http.put<IProduit>(`${this.resourceUrl}/${getProduitIdentifier(produit) as number}`, produit, { observe: 'response' });
  }

  partialUpdate(produit: IProduit): Observable<EntityResponseType> {
    return this.http.patch<IProduit>(`${this.resourceUrl}/${getProduitIdentifier(produit) as number}`, produit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProduitToCollectionIfMissing(produitCollection: IProduit[], ...produitsToCheck: (IProduit | null | undefined)[]): IProduit[] {
    const produits: IProduit[] = produitsToCheck.filter(isPresent);
    if (produits.length > 0) {
      const produitCollectionIdentifiers = produitCollection.map(produitItem => getProduitIdentifier(produitItem)!);
      const produitsToAdd = produits.filter(produitItem => {
        const produitIdentifier = getProduitIdentifier(produitItem);
        if (produitIdentifier == null || produitCollectionIdentifiers.includes(produitIdentifier)) {
          return false;
        }
        produitCollectionIdentifiers.push(produitIdentifier);
        return true;
      });
      return [...produitsToAdd, ...produitCollection];
    }
    return produitCollection;
  }
}
