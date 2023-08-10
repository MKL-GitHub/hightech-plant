import { TestBed } from '@angular/core/testing';

import { ImgFromTextService } from './img-from-text.service';

describe('ImgFromTextService', () => {
  let service: ImgFromTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgFromTextService);
  });

  it('Должен быть создан', () => {
    expect(service).toBeTruthy();
  });
});
