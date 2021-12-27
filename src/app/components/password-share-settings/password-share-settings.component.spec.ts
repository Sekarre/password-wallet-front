import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordShareSettingsComponent } from './password-share-settings.component';

describe('PasswordShareSettingsComponent', () => {
  let component: PasswordShareSettingsComponent;
  let fixture: ComponentFixture<PasswordShareSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordShareSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordShareSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
