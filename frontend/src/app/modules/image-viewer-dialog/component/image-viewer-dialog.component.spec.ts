import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerDialog } from './image-viewer-dialog';

describe('ImageViewerDialog', () => {
  let component: ImageViewerDialog;
  let fixture: ComponentFixture<ImageViewerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageViewerDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageViewerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
