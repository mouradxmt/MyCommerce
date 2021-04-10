import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StockDetailComponent } from './stock-detail.component';

describe('Component Tests', () => {
  describe('Stock Management Detail Component', () => {
    let comp: StockDetailComponent;
    let fixture: ComponentFixture<StockDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [StockDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ stock: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(StockDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StockDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load stock on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stock).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
