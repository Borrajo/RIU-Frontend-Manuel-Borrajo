import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct search term when the input value changes', () => {
    vi.spyOn(component, 'onSearch');
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const searchTerm = 'Superman';
    inputElement.value = searchTerm;

    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.onSearch).toHaveBeenCalledWith(expect.objectContaining({ target: inputElement }));
  });
});
