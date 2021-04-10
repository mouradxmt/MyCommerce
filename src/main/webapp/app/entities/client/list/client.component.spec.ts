import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ClientService } from '../service/client.service';

import { ClientComponent } from './client.component';

describe('Component Tests', () => {
  describe('Client Management Component', () => {
    let comp: ClientComponent;
    let fixture: ComponentFixture<ClientComponent>;
    let service: ClientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ClientComponent],
      })
        .overrideTemplate(ClientComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ClientService);

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
      expect(comp.clients?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
