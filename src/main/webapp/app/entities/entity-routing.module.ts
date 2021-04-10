import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'caisse',
        data: { pageTitle: 'myCommerceApp.caisse.home.title' },
        loadChildren: () => import('./caisse/caisse.module').then(m => m.CaisseModule),
      },
      {
        path: 'client',
        data: { pageTitle: 'myCommerceApp.client.home.title' },
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'produit',
        data: { pageTitle: 'myCommerceApp.produit.home.title' },
        loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule),
      },
      {
        path: 'stock',
        data: { pageTitle: 'myCommerceApp.stock.home.title' },
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule),
      },
      {
        path: 'vente',
        data: { pageTitle: 'myCommerceApp.vente.home.title' },
        loadChildren: () => import('./vente/vente.module').then(m => m.VenteModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
