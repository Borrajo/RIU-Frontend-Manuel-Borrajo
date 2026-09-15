import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroDialog } from './add-hero-dialog';
import { MatDialogRef } from '@angular/material/dialog';

describe('AddHeroDialog', () => {
  let component: AddHeroDialog;
  let fixture: ComponentFixture<AddHeroDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroDialog],
      providers: [
        { provide: MatDialogRef, useValue: {close: vi.fn()} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onClose is called', () => {
    const dialogRefSpy = vi.spyOn(component.dialogRef, 'close');
    const cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    cancelButton.click();
    fixture.detectChanges();

    expect(dialogRefSpy).toHaveBeenCalled();
  });

  it('should disable the submit button when the form is empty', () => {
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
  });

  it('should set errorMessage when onSubmit fails', async () => {

    vi.spyOn(component, 'onSubmit').mockImplementation(() => {
      component.errorMessage.set('Failed to add hero');
      component.isWorking.set(false);
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorMessage()).toBe('Failed to add hero');
  });

  it('should close the dialog when the super hero is added successfully', async () => {

    vi.spyOn(component.dialogRef, 'close');
    
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Batman';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const addHeroButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    
    addHeroButton.click();
    fixture.detectChanges();

    expect(component.dialogRef.close).toHaveBeenCalled();

  });

});
