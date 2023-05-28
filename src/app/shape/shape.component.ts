import { Component, Input } from '@angular/core';
import { Line } from '../models/line.model';

@Component({
  selector: 'shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent {
  @Input() lines: Line[] = [];
  @Input() selectedColor: string = '';

  getLineStroke(line: Line): string {
    return line.color || this.selectedColor;
  }

  getWidth(): number {
    if (this.lines.length > 0) {
      const maxX = Math.max(...this.lines.flatMap(line => [line.from.x, line.to.x]));
      return maxX + 10;
    }
    return 0;
  }

  getHeight(): number {
    if (this.lines.length > 0) {
      const maxY = Math.max(...this.lines.flatMap(line => [line.from.y, line.to.y]));
      return maxY + 10;
    }
    return 0;
  }

  
}

