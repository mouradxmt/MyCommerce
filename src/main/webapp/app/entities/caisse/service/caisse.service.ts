import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICaisse, getCaisseIdentifier } from '../caisse.model';

export type EntityResponseType = HttpResponse<ICaisse>;
export type EntityArrayResponseType = HttpResponse<ICaisse[]>;

@Injectable({ providedIn: 'root' })
export class CaisseService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/caisses');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(caisse: ICaisse): Observable<EntityResponseType> {
    return this.http.post<ICaisse>(this.resourceUrl, caisse, { observe: 'response' });
  }

  update(caisse: ICaisse): Observable<EntityResponseType> {
    return this.http.put<ICaisse>(`${this.resourceUrl}/${getCaisseIdentifier(caisse) as number}`, caisse, { observe: 'response' });
  }

  partialUpdate(caisse: ICaisse): Observable<EntityResponseType> {
    return this.http.patch<ICaisse>(`${this.resourceUrl}/${getCaisseIdentifier(caisse) as number}`, caisse, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICaisse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICaisse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCaisseToCollectionIfMissing(caisseCollection: ICaisse[], ...caissesToCheck: (ICaisse | null | undefined)[]): ICaisse[] {
    const caisses: ICaisse[] = caissesToCheck.filter(isPresent);
    if (caisses.length > 0) {
      const caisseCollectionIdentifiers = caisseCollection.map(caisseItem => getCaisseIdentifier(caisseItem)!);
      const caissesToAdd = caisses.filter(caisseItem => {
        const caisseIdentifier = getCaisseIdentifier(caisseItem);
        if (caisseIdentifier == null || caisseCollectionIdentifiers.includes(caisseIdentifier)) {
          return false;
        }
        caisseCollectionIdentifiers.push(caisseIdentifier);
        return true;
      });
      return [...caissesToAdd, ...caisseCollection];
    }
    return caisseCollection;
  }
}
