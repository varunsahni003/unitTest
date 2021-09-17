import { async, TestBed } from '@angular/core/testing';
import { HttpCallsService } from './httpCalls.service';
import { of, throwError } from 'rxjs';

describe('HttpCallsService', () => {
    let service: HttpCallsService;
    let httpClientSpy: { get: jasmine.Spy };

    const responseData = { test: 'test1' };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HttpCallsService],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new HttpCallsService(httpClientSpy as any);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should make get api call with default response type', done => {
        
        httpClientSpy.get.and.returnValue(of(responseData));

        service.fetch('/api/').subscribe(
            result => {
            expect(result).toEqual(responseData);
            done();
            },
            done.fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return an error if get call fails', done => {
        const error = {
            status: 404,
            statusCode: 404,
            error: 'error'
        }

        spyOn(service, 'fetch').and.returnValue(throwError(error));
        const ser = service.fetch('/api/');
        ser.subscribe(result => {
        }, err => {
            expect(err).toBeTruthy();
            expect(service).toBeDefined();
            expect(err.status).toBe(404);
            done();
        })
    });
});

