import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { StockService } from '../service/stock.service';

import { StockComponent } from './stock.component';

describe('Component Tests', () => {
  describe('Stock Management Component', () => {
    let comp: StockComponent;
    let fixture: ComponentFixture<StockComponent>;
    let service: StockService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [StockComponent],
      })
        .overrideTemplate(StockComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(StockService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stocks?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
