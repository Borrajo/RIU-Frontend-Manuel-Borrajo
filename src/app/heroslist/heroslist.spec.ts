import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heroslist } from './heroslist';
import { PageEvent } from '@angular/material/paginator';
import { MatMenu } from '@angular/material/menu';

describe('Heroslist', () => {
  let component: Heroslist;
  let fixture: ComponentFixture<Heroslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heroslist, MatMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(Heroslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of heroes', () => {
    const herosQty = 30;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heroRows = compiled.querySelector('.mat-mdc-paginator-range-label');
    expect(heroRows?.textContent?.includes(`of ${herosQty}`)).toBeTruthy();
  });

  it('should emit the correct page event when the paginator is used', () => {
    const pageEvent: PageEvent = { previousPageIndex: 0, pageIndex: 1, pageSize: 10, length: 30 };
    const nextPageButton = fixture.nativeElement.querySelector('.mat-mdc-paginator-navigation-next');
    nextPageButton.click();
    fixture.detectChanges();

    expect(component.pageIndex()).toEqual(pageEvent.pageIndex);
    expect(component.pageSize()).toEqual(pageEvent.pageSize);
  });

  it('should call onEditHero when the edit button is clicked', () => {
    vi.spyOn(component, 'onEditHero');

    // Open the menu to reveal the edit button
    const menuButton: HTMLElement = fixture.nativeElement.querySelector('.mat-mdc-menu-trigger');
    menuButton.click();
    fixture.detectChanges();

    // Click the edit button
    const editHeroButton: HTMLElement | null = document.querySelector('.mat-mdc-menu-item');
    const heroId = '550e8400-e29b-41d4-a716-446655440000';
    editHeroButton?.click();

    expect(component.onEditHero).toHaveBeenCalledWith(heroId);
  });

  it('should call onDeleteHero when the delete button is clicked', () => {
    vi.spyOn(component, 'onDeleteHero');

    // Open the menu to reveal the delete button
    const menuButton: HTMLElement = fixture.nativeElement.querySelector('.mat-mdc-menu-trigger');
    menuButton.click();
    fixture.detectChanges();

    // Click the delete button
    const deleteHeroButton: HTMLElement | null = document.querySelector('.mat-mdc-menu-item:nth-child(2)');
    const heroId = '550e8400-e29b-41d4-a716-446655440000';
    deleteHeroButton?.click();

    expect(component.onDeleteHero).toHaveBeenCalledWith(heroId);
  });

});
