import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroButton } from './add-hero-button';

describe('AddHeroButton', () => {
  let component: AddHeroButton;
  let fixture: ComponentFixture<AddHeroButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeroButton],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHeroButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct event when the button is clicked', () => {
    vi.spyOn(component, 'openDialog');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    fixture.detectChanges();

    expect(component.openDialog).toHaveBeenCalled();
  });
  
});
