import { appConfig } from './app.config';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

describe('AppConfig', () => {
  it('should provide critical services', () => {
    TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    });

    expect(() => TestBed.inject(Router)).not.toThrow();

    expect(() => TestBed.inject(Store)).not.toThrow();
  });
});
