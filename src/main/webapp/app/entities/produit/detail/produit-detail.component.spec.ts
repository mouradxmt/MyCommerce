import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProduitDetailComponent } from './produit-detail.component';

describe('Component Tests', () => {
  describe('Produit Management Detail Component', () => {
    let comp: ProduitDetailComponent;
    let fixture: ComponentFixture<ProduitDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProduitDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ produit: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProduitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProduitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load produit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
