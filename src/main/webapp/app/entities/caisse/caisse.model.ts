export interface ICaisse {
  id?: number;
  argentRetraite?: number | null;
  argentDepose?: number | null;
  caisseAttendu?: number | null;
}

export class Caisse implements ICaisse {
  constructor(
    public id?: number,
    public argentRetraite?: number | null,
    public argentDepose?: number | null,
    public caisseAttendu?: number | null
  ) {}
}

export function getCaisseIdentifier(caisse: ICaisse): number | undefined {
  return caisse.id;
}
