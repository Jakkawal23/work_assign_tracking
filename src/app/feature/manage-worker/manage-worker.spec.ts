import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorker } from './manage-worker';

describe('ManageWorker', () => {
  let component: ManageWorker;
  let fixture: ComponentFixture<ManageWorker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageWorker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
