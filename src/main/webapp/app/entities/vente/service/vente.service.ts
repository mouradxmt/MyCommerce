import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVente, getVenteIdentifier } from '../vente.model';

export type EntityResponseType = HttpResponse<IVente>;
export type EntityArrayResponseType = HttpResponse<IVente[]>;

@Injectable({ providedIn: 'root' })
export class VenteService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ventes');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(vente: IVente): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vente);
    return this.http
      .post<IVente>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vente: IVente): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vente);
    return this.http
      .put<IVente>(`${this.resourceUrl}/${getVenteIdentifier(vente) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(vente: IVente): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vente);
    return this.http
      .patch<IVente>(`${this.resourceUrl}/${getVenteIdentifier(vente) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVente>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVente[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVenteToCollectionIfMissing(venteCollection: IVente[], ...ventesToCheck: (IVente | null | undefined)[]): IVente[] {
    const ventes: IVente[] = ventesToCheck.filter(isPresent);
    if (ventes.length > 0) {
      const venteCollectionIdentifiers = venteCollection.map(venteItem => getVenteIdentifier(venteItem)!);
      const ventesToAdd = ventes.filter(venteItem => {
        const venteIdentifier = getVenteIdentifier(venteItem);
        if (venteIdentifier == null || venteCollectionIdentifiers.includes(venteIdentifier)) {
          return false;
        }
        venteCollectionIdentifiers.push(venteIdentifier);
        return true;
      });
      return [...ventesToAdd, ...venteCollection];
    }
    return venteCollection;
  }

  protected convertDateFromClient(vente: IVente): IVente {
    return Object.assign({}, vente, {
      dateVente: vente.dateVente?.isValid() ? vente.dateVente.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateVente = res.body.dateVente ? dayjs(res.body.dateVente) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vente: IVente) => {
        vente.dateVente = vente.dateVente ? dayjs(vente.dateVente) : undefined;
      });
    }
    return res;
  }
}
