import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySetComponent } from './key-set.component';

describe('KeySetComponent', () => {
  let component: KeySetComponent;
  let fixture: ComponentFixture<KeySetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeySetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
