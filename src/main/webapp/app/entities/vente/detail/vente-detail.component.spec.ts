import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VenteDetailComponent } from './vente-detail.component';

describe('Component Tests', () => {
  describe('Vente Management Detail Component', () => {
    let comp: VenteDetailComponent;
    let fixture: ComponentFixture<VenteDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [VenteDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ vente: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(VenteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VenteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load vente on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
