import { async, TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { AppModule } from '../../app.module';

describe('LoaderService', () => {

    let service: LoaderService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoaderService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        // service = TestBed.get(LoaderService);
        service = new LoaderService();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should show loader', () => {
        service.showLoader();

        expect(service.loaderEnabled).toBe(true);
    });

    it('should hide loader', () => {
        service.hideLoader();

        expect(service.loaderEnabled).toBe(false);
    });
});
