import { IVente } from 'app/entities/vente/vente.model';

export interface IClient {
  id?: number;
  nom?: string | null;
  prenom?: string | null;
  mail?: string | null;
  telephone?: string | null;
  localisation?: string | null;
  ventes?: IVente[] | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public nom?: string | null,
    public prenom?: string | null,
    public mail?: string | null,
    public telephone?: string | null,
    public localisation?: string | null,
    public ventes?: IVente[] | null
  ) {}
}

export function getClientIdentifier(client: IClient): number | undefined {
  return client.id;
}
