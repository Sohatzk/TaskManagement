import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkItemGridComponent } from './work-item-grid.component';

describe('WorkItemGridComponent', () => {
  let component: WorkItemGridComponent;
  let fixture: ComponentFixture<WorkItemGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkItemGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
