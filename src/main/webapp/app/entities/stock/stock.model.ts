import * as dayjs from 'dayjs';

export interface IStock {
  id?: number;
  dateEntree?: dayjs.Dayjs | null;
  fournisseur?: string | null;
  libelle?: string | null;
  quantite?: number | null;
  montantAchatTTC?: number | null;
  datePaiement?: dayjs.Dayjs | null;
}

export class Stock implements IStock {
  constructor(
    public id?: number,
    public dateEntree?: dayjs.Dayjs | null,
    public fournisseur?: string | null,
    public libelle?: string | null,
    public quantite?: number | null,
    public montantAchatTTC?: number | null,
    public datePaiement?: dayjs.Dayjs | null
  ) {}
}

export function getStockIdentifier(stock: IStock): number | undefined {
  return stock.id;
}
