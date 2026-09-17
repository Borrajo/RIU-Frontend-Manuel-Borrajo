import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeroDialog } from './delete-hero-dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DeleteHeroDialog', () => {
  let component: DeleteHeroDialog;
  let fixture: ComponentFixture<DeleteHeroDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHeroDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { id: '1', name: 'Test Hero' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteHeroDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
