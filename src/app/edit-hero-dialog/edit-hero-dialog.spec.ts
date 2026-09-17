import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroDialog } from './edit-hero-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Hero } from '../../shared/interfaces/hero.interface';

const mockHero: Hero = {
  id: '1',
  name: 'Test Hero',
  comesFrom: 'testland',
  power: 'none',
  realName: 'Im a test',
  universe: 'test'
}

describe('EditHeroDialog', () => {
  let component: EditHeroDialog;
  let fixture: ComponentFixture<EditHeroDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: mockHero }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete the form with the data input values', ()=> { 
     const [inputName, inputRealName, inputFrom ]: HTMLInputElement[] = fixture.nativeElement.querySelectorAll('input');
     const inputPower: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

     expect(inputName.value).toEqual('Test Hero');
     expect(inputFrom.value).toEqual('testland');
     expect(inputRealName.value).toEqual('Im a test');
     expect(inputPower.value).toEqual('none');

  })

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

    const inputName: HTMLInputElement = fixture.nativeElement.querySelector('input');

    // Complete the form
    inputName.value = 'Batman';
    inputName.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const editHeroButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    
    editHeroButton.click();
    fixture.detectChanges();

    expect(component.dialogRef.close).toHaveBeenCalled();

  });
});
