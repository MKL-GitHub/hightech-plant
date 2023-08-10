import { Component, OnInit, ViewChild } from '@angular/core';
import { Pet } from 'src/app/models/pet';
import { ImgFromTextService } from 'src/app/services/img-from-text.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private petService: PetService,
    private imgFromTextService: ImgFromTextService,
  ) { }

  pets: Pet[] = [];
  selectedPet: Pet | null = null;

  /**
   * Запрашивает из petService питомцев
   */
  ngOnInit(): void {
    this.petService.getPets().subscribe({
      next: (pets) => this.pets = pets,
      error: (error) => console.error(error),
    })
  }

  /**
   * Устанавливает выбранного питомца
   * @param {Pet} pet объект питомца
   */
  onPetClick(pet: Pet) {
    for (let i = 0; i < pet.photoUrls.length; i++) {
      pet.photoUrls[i] = this.imgFromTextService.generate(pet.photoUrls[i]);
    }

    this.selectedPet = pet;
  }

  /**
   * Сбрасывает выбранного питомца
   * @param {MouseEvent} event событие мыши
   */
  resetSelectedPed(event: MouseEvent) {
    this.selectedPet = null;
  }
}