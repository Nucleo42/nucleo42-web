import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NgxsModule, Store } from '@ngxs/store';
import { Navigate, NgxsRouterPluginModule } from '@ngxs/router-plugin';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NgxsModule.forRoot([]), NgxsRouterPluginModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Navigate action on onClick', () => {
    const store = TestBed.inject(Store);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.onClick();

    expect(dispatchSpy).toHaveBeenCalledWith(new Navigate(['/layout']));
  });
});
