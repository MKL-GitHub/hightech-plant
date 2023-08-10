import { Component, Input, ElementRef, ViewChild, HostListener, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-resizable-layout',
  templateUrl: './resizable-layout.component.html',
  styleUrls: ['./resizable-layout.component.scss']
})
export class ResizableLayoutComponent implements AfterContentInit {
  @Input() column: boolean = false;
  @Input() startSize: number = 50;
  @Input() endSize: number = 50;
  @Input() showStart: boolean = true;
  @Input() showEnd: boolean = true;

  @ViewChild('start', { static: false }) startRef!: ElementRef;
  @ViewChild('end', { static: false }) endRef!: ElementRef;

  pressedPosition: {
    pos: number,
    startSize: number,
    endSize: number,
  } | null = null;
  sizeParam: 'height' | 'width' = 'width';

  /**
   * Устанавливает sizeParam в значение 'height', если column = true
   */
  ngAfterContentInit(): void {
    if (this.column) this.sizeParam = 'height';
  }

  /**
   * Возвращает положение мыши относительно выбранной ориентации макета
   * @param {MouseEvent} event событие мыши
   * @returns {Number} позиция мыши
   */
  getMousePos(event: MouseEvent): number {
    return this.column ? event.clientY : event.clientX;
  }

  /**
   * Устанавливает pressedPosition при клике на разделитель
   * @param {MouseEvent} event событие мыши
   */
  onResizerMouseDown(event: MouseEvent) {
    const getSize = (elementRef: ElementRef) => {
      return parseFloat(getComputedStyle(elementRef.nativeElement)[this.sizeParam]);
    }

    this.pressedPosition = {
      pos: this.getMousePos(event),
      startSize: getSize(this.startRef),
      endSize: getSize(this.endRef),
    };
  }

  /**
   * Сбрасывает pressedPosition при отжатии левой клавиши мыши
   */
  @HostListener('window:mouseup')
  onResizerMouseUp() {
    this.pressedPosition = null;
  }

  /**
   * Изменяет размер начального и конечного блоков при передвижении разделителя
   * @param {MouseEvent} event событие мыши
   */
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (event.buttons === 1 && this.pressedPosition) {
      const shift = this.getMousePos(event) - this.pressedPosition.pos;

      const setElementSize = (elementRef: ElementRef, originSize: number, shift: number) => {
        elementRef.nativeElement.style[this.sizeParam] = originSize + shift + 'px';
      }

      setElementSize(this.startRef, this.pressedPosition.startSize, shift);
      setElementSize(this.endRef, this.pressedPosition.endSize, -shift);
    }
  }

  /**
   * Возвращает объект с обновленным размером ширины или высоты
   * @param {Number} size размер блока
   * @return {{[key]: string}}
   */
  getStyle = (size: number) => ({
    [this.sizeParam]: size + '%'
  });
}
