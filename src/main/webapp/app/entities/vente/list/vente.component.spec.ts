import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VenteService } from '../service/vente.service';

import { VenteComponent } from './vente.component';

describe('Component Tests', () => {
  describe('Vente Management Component', () => {
    let comp: VenteComponent;
    let fixture: ComponentFixture<VenteComponent>;
    let service: VenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [VenteComponent],
      })
        .overrideTemplate(VenteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VenteComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(VenteService);

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
      expect(comp.ventes?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
