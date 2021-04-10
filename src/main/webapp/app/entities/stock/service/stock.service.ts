import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStock, getStockIdentifier } from '../stock.model';

export type EntityResponseType = HttpResponse<IStock>;
export type EntityArrayResponseType = HttpResponse<IStock[]>;

@Injectable({ providedIn: 'root' })
export class StockService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/stocks');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(stock: IStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stock);
    return this.http
      .post<IStock>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(stock: IStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stock);
    return this.http
      .put<IStock>(`${this.resourceUrl}/${getStockIdentifier(stock) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(stock: IStock): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stock);
    return this.http
      .patch<IStock>(`${this.resourceUrl}/${getStockIdentifier(stock) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStock>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStock[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addStockToCollectionIfMissing(stockCollection: IStock[], ...stocksToCheck: (IStock | null | undefined)[]): IStock[] {
    const stocks: IStock[] = stocksToCheck.filter(isPresent);
    if (stocks.length > 0) {
      const stockCollectionIdentifiers = stockCollection.map(stockItem => getStockIdentifier(stockItem)!);
      const stocksToAdd = stocks.filter(stockItem => {
        const stockIdentifier = getStockIdentifier(stockItem);
        if (stockIdentifier == null || stockCollectionIdentifiers.includes(stockIdentifier)) {
          return false;
        }
        stockCollectionIdentifiers.push(stockIdentifier);
        return true;
      });
      return [...stocksToAdd, ...stockCollection];
    }
    return stockCollection;
  }

  protected convertDateFromClient(stock: IStock): IStock {
    return Object.assign({}, stock, {
      dateEntree: stock.dateEntree?.isValid() ? stock.dateEntree.format(DATE_FORMAT) : undefined,
      datePaiement: stock.datePaiement?.isValid() ? stock.datePaiement.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateEntree = res.body.dateEntree ? dayjs(res.body.dateEntree) : undefined;
      res.body.datePaiement = res.body.datePaiement ? dayjs(res.body.datePaiement) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((stock: IStock) => {
        stock.dateEntree = stock.dateEntree ? dayjs(stock.dateEntree) : undefined;
        stock.datePaiement = stock.datePaiement ? dayjs(stock.datePaiement) : undefined;
      });
    }
    return res;
  }
}
