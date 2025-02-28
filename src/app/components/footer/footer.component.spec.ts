import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let iconRegistry: MatIconRegistry;
  let sanitizer: DomSanitizer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, FooterComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), MatIconRegistry],
    }).compileComponents();

    iconRegistry = TestBed.inject(MatIconRegistry);
    sanitizer = TestBed.inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('linkedin', sanitizer.bypassSecurityTrustHtml('<svg></svg>'));

    iconRegistry = TestBed.inject(MatIconRegistry);
    sanitizer = TestBed.inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('github', sanitizer.bypassSecurityTrustHtml('<svg></svg>'));

    iconRegistry = TestBed.inject(MatIconRegistry);
    sanitizer = TestBed.inject(DomSanitizer);
    iconRegistry.addSvgIconLiteral('discord', sanitizer.bypassSecurityTrustHtml('<svg></svg>'));

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleClick() Method', () => {
    it('should open LinkedIn URL for platform "linkedIn"', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(jest.fn());
      component.handleClick('linkedin');
      expect(openSpy).toHaveBeenCalledWith('https://linkedin.com', '_blank');
    });

    it('should open GitHub URL for platform "gitHub"', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(jest.fn());
      component.handleClick('github');
      expect(openSpy).toHaveBeenCalledWith('https://github.com', '_blank');
    });

    it('should open Discord URL for platform "discord"', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(jest.fn());
      component.handleClick('discord');
      expect(openSpy).toHaveBeenCalledWith('https://discord.com', '_blank');
    });

    it('should log "Unknown platform" for unknown platform', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
      component.handleClick('unknown');
      expect(logSpy).toHaveBeenCalledWith('Unknown platform');
    });
  });
});
