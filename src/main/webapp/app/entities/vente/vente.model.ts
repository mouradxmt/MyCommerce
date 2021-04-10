import * as dayjs from 'dayjs';
import { IClient } from 'app/entities/client/client.model';
import { IProduit } from 'app/entities/produit/produit.model';

export interface IVente {
  id?: number;
  dateVente?: dayjs.Dayjs | null;
  nomRevendeur?: string | null;
  modePaiement?: string | null;
  montantVente?: number | null;
  client?: IClient | null;
  produits?: IProduit[] | null;
}

export class Vente implements IVente {
  constructor(
    public id?: number,
    public dateVente?: dayjs.Dayjs | null,
    public nomRevendeur?: string | null,
    public modePaiement?: string | null,
    public montantVente?: number | null,
    public client?: IClient | null,
    public produits?: IProduit[] | null
  ) {}
}

export function getVenteIdentifier(vente: IVente): number | undefined {
  return vente.id;
}
