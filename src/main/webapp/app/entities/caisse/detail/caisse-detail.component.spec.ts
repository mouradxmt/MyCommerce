import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CaisseDetailComponent } from './caisse-detail.component';

describe('Component Tests', () => {
  describe('Caisse Management Detail Component', () => {
    let comp: CaisseDetailComponent;
    let fixture: ComponentFixture<CaisseDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CaisseDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ caisse: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CaisseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CaisseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load caisse on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.caisse).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
