import { Component, Input } from '@angular/core';
import { Line } from '../models/line.model';

@Component({
  selector: 'shape',
template: `
   <svg [attr.width]="getWidth()" [attr.height]="getHeight()">
  <ng-container *ngFor="let line of lines">
    <line [attr.x1]="line.from.x" [attr.y1]="line.from.y" [attr.x2]="line.to.x" [attr.y2]="line.to.y" [attr.stroke]="line.color"></line>
   </ng-container>
 </svg>
  `,
  styles: [
    'svg { border: 1px solid black; }',
    'line { stroke-width: 2px; }'
  ]
})
export class ShapeComponent {
  @Input() lines: Line[] = [];

  getWidth(): number {
    if (this.lines.length > 0) {
      const maxX = Math.max(...this.lines.flatMap(line => [line.from.x, line.to.x]));
      return maxX + 10; // Add padding for the border
    }
    return 0;
  }
  
  getHeight(): number {
    if (this.lines.length > 0) {
      const maxY = Math.max(...this.lines.flatMap(line => [line.from.y, line.to.y]));
      return maxY + 10; // Add padding for the border
    }
    return 0;
  }
  
  
}

// interface Line {
//   from: Point;
//   to: Point;
//   color?: string; // Added color property to the Line interface
// }

interface Point {
  x: number;
  y: number;
}
