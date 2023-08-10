import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailsComponent } from './pet-details.component';
import { Pet } from 'src/app/models/pet';
import { By } from '@angular/platform-browser';

const mockPet: Pet = {
  id: 1,
  name: 'Dog',
  photoUrls: ['dog1.jpg', 'dog2.jpg'],
  status: 'available',
  tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }]
};

const mockEvent = new MouseEvent('click');

describe('PetDetailsComponent', () => {
  let component: PetDetailsComponent;
  let fixture: ComponentFixture<PetDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetDetailsComponent]
    });

    fixture = TestBed.createComponent(PetDetailsComponent);
    component = fixture.componentInstance;

    component.pet = mockPet;
    fixture.detectChanges();
  });

  it('Должен создать', () => {
    expect(component).toBeTruthy();
  });

  it('Должен имитировать событие onCloseClick, при клике на кнопку закрытия', () => {
    const emitSpy = spyOn(component.onCloseClick, 'emit');

    component.onClose(mockEvent);

    expect(emitSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('Должен отобразить h2', () => {
    const h2Element = fixture.debugElement.query(By.css('h2'));

    expect(h2Element).toBeTruthy();
  });

  it('Должен отобразить подробную информацию о питомце', () => {
    const petNameElement = fixture.debugElement.query(By.css('.PetDetails__common li:nth-child(1) span:nth-child(2)'));
    const petCategoryElement = fixture.debugElement.query(By.css('.PetDetails__common li:nth-child(2) span:nth-child(2)'));
    const petStatusElement = fixture.debugElement.query(By.css('.PetDetails__common li:nth-child(3) span:nth-child(2)'));
    const petTagElements = fixture.debugElement.queryAll(By.css('.PetDetails__tags li'));
    const petPhotoElements = fixture.debugElement.queryAll(By.css('.PetDetails__photos img'));

    expect(petNameElement.nativeElement.textContent).toContain(mockPet.name);
    expect(petStatusElement.nativeElement.textContent).toContain(mockPet.status);
    expect(petTagElements.length).toBe(mockPet.tags.length);
    expect(petPhotoElements.length).toBe(mockPet.photoUrls.length);

    if (mockPet.category) {
      expect(petCategoryElement.nativeElement.textContent).toContain(mockPet.category.name);
    } else {
      expect(petCategoryElement.nativeElement.textContent).toEqual('')
    }
  });
});
