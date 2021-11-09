import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EMPTY, of } from 'rxjs';
import { AppComponent } from './app.component';
import { UserRole, UserRoleService } from './core';

describe(AppComponent.name, () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let userRoleServiceMock: Partial<UserRoleService>;

  beforeEach(() => {
    userRoleServiceMock = {};
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserRoleService, useValue: userRoleServiceMock }],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    userRoleServiceMock.getCurrentUserRole = jasmine
      .createSpy()
      .and.returnValue(EMPTY);
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  describe('title element', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it(`should have 'shop' as title`, () => {
      expect(
        (debugElement.query(By.css('h1')).nativeElement as HTMLElement)
          .textContent
      ).toEqual('shop');
    });
  });

  describe('user role controls', () => {
    describe('when user role is set to "admin"', () => {
      beforeEach(() => {
        userRoleServiceMock.getCurrentUserRole = jasmine
          .createSpy()
          .and.returnValue(of(UserRole.ADMIN));

        fixture = TestBed.createComponent(AppComponent);
        debugElement = fixture.debugElement;

        fixture.detectChanges();
      });
      it('should display admin control as checked', () => {
        expect(
          debugElement.query(By.css('#role__user')).nativeElement.checked
        ).toBeFalse();
        expect(
          debugElement.query(By.css('#role__admin')).nativeElement.checked
        ).toBeTrue();
      });
    });
    describe('when user role is set to "user"', () => {
      beforeEach(() => {
        userRoleServiceMock.getCurrentUserRole = jasmine
          .createSpy()
          .and.returnValue(of(UserRole.USER));

        fixture = TestBed.createComponent(AppComponent);
        debugElement = fixture.debugElement;

        fixture.detectChanges();
      });
      it('should display user control as checked', () => {
        expect(
          debugElement.query(By.css('#role__admin')).nativeElement.checked
        ).toBeFalse();
        expect(
          debugElement.query(By.css('#role__user')).nativeElement.checked
        ).toBeTrue();
      });
    });
  });

  describe('router links', () => {
    it('should have 3 router links', () => {
      expect(
        debugElement.query(By.css('[routerLink="/products-list"]'))
      ).toBeDefined();
      expect(debugElement.query(By.css('[routerLink="/cart"]'))).toBeDefined();
      expect(debugElement.query(By.css('[routerLink="/admin"]'))).toBeDefined();
    });
  });
});
