import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTableComponent } from './pet-table.component';
import { Pet } from 'src/app/models/pet';

const mockPets: Pet[] = [
  {
    id: 1,
    name: 'Dog',
    photoUrls: ['dog1.jpg', 'dog2.jpg'],
    status: 'available',
    tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }]
  },
  {
    id: 2,
    name: 'Cat',
    photoUrls: ['cat1.jpg', 'cat2.jpg'],
    status: 'pending',
    tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }]
  }
];

describe('PetTableComponent', () => {
  let component: PetTableComponent;
  let fixture: ComponentFixture<PetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetTableComponent]
    });

    fixture = TestBed.createComponent(PetTableComponent);
    component = fixture.componentInstance;
  });

  it('Должен создать', () => {
    expect(component).toBeTruthy();
  });

  it('Должен отобразить питомцев в таблице', () => {
    component.pets = mockPets;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);  // Включая header

    const firstRowCells = tableRows[1].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain(mockPets[0].name);
    mockPets[0].category && expect(firstRowCells[1].textContent).toContain(mockPets[0].category.name);
    expect(firstRowCells[2].textContent).toContain(mockPets[0].status);

    const secondRowCells = tableRows[2].querySelectorAll('td');
    expect(secondRowCells[0].textContent).toContain(mockPets[1].name);
    mockPets[1].category && expect(secondRowCells[1].textContent).toContain(mockPets[1].category.name);
    expect(secondRowCells[2].textContent).toContain(mockPets[1].status);
  });

  it('Должен имитировать событие onPetClick при клике на tr', () => {
    spyOn(component.onPetClick, 'emit');

    component.pets = [mockPets[0]];
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('tbody tr');
    row.click();

    expect(component.onPetClick.emit).toHaveBeenCalledWith(mockPets[0]);
  });
});
