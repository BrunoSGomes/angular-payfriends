import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchTaskComponent } from './patch-task.component';

describe('PatchTaskComponent', () => {
  let component: PatchTaskComponent;
  let fixture: ComponentFixture<PatchTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatchTaskComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
