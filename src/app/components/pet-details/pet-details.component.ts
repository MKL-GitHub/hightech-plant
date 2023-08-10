import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from 'src/app/models/pet';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.scss']
})
export class PetDetailsComponent {
  @Input() pet!: Pet;
  @Output() onCloseClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /**
   * Имитирует событие onCloseClick при клике на кнопку закрыть
   * @param {MouseEvent} event событие мыши
   */
  onClose(event: MouseEvent) {
    this.onCloseClick.emit(event);
  }
}
