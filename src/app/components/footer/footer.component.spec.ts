import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleClick() Method', () => {
    it('should open Twitter URL for platform "twitter"', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
      component.handleClick('twitter');
      expect(openSpy).toHaveBeenCalledWith('https://twitter.com', '_blank');
      component.handleClick('linkedIn');
      expect(openSpy).toHaveBeenCalledWith('https://twitter.com', '_blank');
      component.handleClick('gitHub');
      expect(openSpy).toHaveBeenCalledWith('https://twitter.com', '_blank');
      component.handleClick('discord');
      expect(openSpy).toHaveBeenCalledWith('https://twitter.com', '_blank');
    });
  });
});
