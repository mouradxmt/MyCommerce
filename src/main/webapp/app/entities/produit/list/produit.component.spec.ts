import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ProduitService } from '../service/produit.service';

import { ProduitComponent } from './produit.component';

describe('Component Tests', () => {
  describe('Produit Management Component', () => {
    let comp: ProduitComponent;
    let fixture: ComponentFixture<ProduitComponent>;
    let service: ProduitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProduitComponent],
      })
        .overrideTemplate(ProduitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduitComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProduitService);

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
      expect(comp.produits?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
