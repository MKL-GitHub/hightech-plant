import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizableLayoutComponent } from './resizable-layout.component';
import { By } from '@angular/platform-browser';

const mockPressedPosition = {
  pos: 50,
  startSize: 10,
  endSize: 30,
};

describe('ResizableLayoutComponent', () => {
  let component: ResizableLayoutComponent;
  let fixture: ComponentFixture<ResizableLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResizableLayoutComponent]
    });

    fixture = TestBed.createComponent(ResizableLayoutComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('Должен создать', () => {
    expect(component).toBeTruthy();
  });

  it('Должен установить sizeParam = width, если column === true', () => {
    expect(component.sizeParam).toEqual('width');
  });

  it('Должен установить sizeParam = height, если column не указано', () => {
    component.column = true;
    component.ngAfterContentInit();

    expect(component.sizeParam).toEqual('height');
  });

  it('Должен изменить ширину или высоту начального и конечного блока при перемещении разделителя', () => {
    fixture.detectChanges();
    component.startRef = fixture.debugElement.query(By.css('.ResizableLayout__start'));
    component.endRef = fixture.debugElement.query(By.css('.ResizableLayout__end'));
    component.pressedPosition = mockPressedPosition;
    component.showStart = true;
    component.showEnd = true;

    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 80,
      clientY: 120,
      buttons: 1,
    });
    const startSize = 100;
    const endSize = 200;

    component.startSize = startSize;
    component.endSize = endSize;

    component.onResizerMouseDown(new MouseEvent('mousedown'));
    component.onMouseMove(mockMouseEvent);

    const shift = component.getMousePos(mockMouseEvent) - component.pressedPosition.pos;

    expect(component.startRef.nativeElement.style[component.sizeParam]).toBe(
      `${component.pressedPosition.startSize + shift}px`
    );
    expect(component.endRef.nativeElement.style[component.sizeParam]).toBe(
      `${component.pressedPosition.endSize - shift}px`
    );
  });

  it('Должен очистить pressedPosition при событии onResizerMouseUp', () => {
    component.pressedPosition = mockPressedPosition;

    component.onResizerMouseUp();

    expect(component.pressedPosition).toBeNull();
  });
});
