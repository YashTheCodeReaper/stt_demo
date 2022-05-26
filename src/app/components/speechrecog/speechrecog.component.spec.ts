import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechrecogComponent } from './speechrecog.component';

describe('SpeechrecogComponent', () => {
  let component: SpeechrecogComponent;
  let fixture: ComponentFixture<SpeechrecogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeechrecogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechrecogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
