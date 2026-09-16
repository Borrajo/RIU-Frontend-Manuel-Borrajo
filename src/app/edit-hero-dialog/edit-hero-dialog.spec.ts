import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroDialog } from './edit-hero-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EditHeroDialog', () => {
  let component: EditHeroDialog;
  let fixture: ComponentFixture<EditHeroDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { id: '1', name: 'Test Hero' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled form when the input contains only whitespace', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');

    inputElement.value = '   '; // Set the input value to whitespace

    inputElement.value = '   ';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
  });

    it('should close the dialog when the super hero is updated successfully', async () => {

    vi.spyOn(component.dialogRef, 'close');

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Batman';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const editHeroButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    
    editHeroButton.click();
    fixture.detectChanges();

    expect(component.dialogRef.close).toHaveBeenCalled();

  });
});
