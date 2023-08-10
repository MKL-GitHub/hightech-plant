import { PetService } from "src/app/services/pet.service";
import { HomePageComponent } from "./home-page.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgFromTextService } from "src/app/services/img-from-text.service";
import { ResizableLayoutComponent } from "src/app/components/layouts/resizable-layout/resizable-layout.component";
import { PetTableComponent } from "src/app/components/pet-table/pet-table.component";
import { PetDetailsComponent } from "src/app/components/pet-details/pet-details.component";
import { By } from "@angular/platform-browser";
import { Pet } from "src/app/models/pet";
import { of } from "rxjs";

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

const mockSelectedPet: Pet = {
  id: 1,
  name: 'Dog',
  photoUrls: ['dog1.jpg', 'dog2.jpg'],
  status: 'available',
  tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }]
};

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let mockPetService: jasmine.SpyObj<PetService>;

  beforeEach(() => {
    mockPetService = jasmine.createSpyObj(['getPets']);

    TestBed.configureTestingModule({
      declarations: [
        HomePageComponent,
        ResizableLayoutComponent,
        PetTableComponent,
        PetDetailsComponent,
      ],
      providers: [
        { provide: PetService, useValue: mockPetService },
      ]
    });

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => fixture.destroy());

  it('Должен создать', () => {
    expect(component).toBeTruthy();
  });

  it('Должен получить питомцев через API запрос при инициализации', () => {
    mockPetService.getPets.and.returnValue(of(mockPets));
    component.ngOnInit();

    expect(component.pets).toEqual(mockPets);
  })

  it('Должен отобразить заголовок', () => {
    const h1Element = fixture.nativeElement.querySelector('h1');

    expect(h1Element).toBeTruthy();
    expect(h1Element.textContent).toEqual(' Компания "ООО ХайТек Плант"тестовое задание ');
  });

  it('Должен отобразить ResizableLayout', () => {
    const resizableLayoutElement = fixture.debugElement.query(By.directive(ResizableLayoutComponent));

    expect(resizableLayoutElement).toBeTruthy();
  })

  it('Должен отобразить таблицу с питомцами', () => {
    mockPetService.getPets.and.returnValue(of(mockPets));
    fixture.detectChanges();

    const petTableElement = fixture.debugElement.query(By.directive(PetTableComponent));

    expect(petTableElement).toBeTruthy();
  });

  it('Должен отобразить подробную информацию о выбранном питомце', () => {
    component.selectedPet = mockSelectedPet;
    mockPetService.getPets.and.returnValue(of(mockPets));
    fixture.detectChanges();

    const petDetailsElement = fixture.debugElement.query(By.directive(PetDetailsComponent));

    expect(petDetailsElement).toBeTruthy();
  });

  it('Не должен отображать подробную информацию о питомце, если selectedPet === null', () => {
    component.selectedPet = null;
    mockPetService.getPets.and.returnValue(of(mockPets));
    fixture.detectChanges();

    const petDetailsElement = fixture.debugElement.query(By.directive(PetDetailsComponent));

    expect(petDetailsElement).not.toBeTruthy();
  });
});
