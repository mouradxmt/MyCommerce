import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CaisseService } from '../service/caisse.service';

import { CaisseComponent } from './caisse.component';

describe('Component Tests', () => {
  describe('Caisse Management Component', () => {
    let comp: CaisseComponent;
    let fixture: ComponentFixture<CaisseComponent>;
    let service: CaisseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CaisseComponent],
      })
        .overrideTemplate(CaisseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CaisseComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CaisseService);

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
      expect(comp.caisses?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
