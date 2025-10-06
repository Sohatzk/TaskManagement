import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemTypeComponent } from './work-item-type.component';

describe('WorkItemTypeComponent', () => {
  let component: WorkItemTypeComponent;
  let fixture: ComponentFixture<WorkItemTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkItemTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
