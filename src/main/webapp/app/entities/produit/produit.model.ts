import { IVente } from 'app/entities/vente/vente.model';

export interface IProduit {
  id?: number;
  libelle?: string | null;
  categorie?: string | null;
  prixVente?: number | null;
  prixAchat?: number | null;
  tVA?: number | null;
  vente?: IVente | null;
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public libelle?: string | null,
    public categorie?: string | null,
    public prixVente?: number | null,
    public prixAchat?: number | null,
    public tVA?: number | null,
    public vente?: IVente | null
  ) {}
}

export function getProduitIdentifier(produit: IProduit): number | undefined {
  return produit.id;
}
