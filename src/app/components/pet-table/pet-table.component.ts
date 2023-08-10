import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from 'src/app/models/pet';

@Component({
  selector: 'app-pet-table',
  templateUrl: './pet-table.component.html',
  styleUrls: ['./pet-table.component.scss']
})
export class PetTableComponent {
  @Input() pets!: Pet[];
  @Output() onPetClick: EventEmitter<Pet> = new EventEmitter<Pet>();

  /**
   * Имитирует событие onPetClick при клике на строку с питомцем
   * @param {Pet} pet питомец
   */
  onRowClick(pet: Pet) {
    this.onPetClick.emit(pet);
  }
}
