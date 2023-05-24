import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Line } from "../models/line.model";
import { Shape } from "../models/shape";
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  shapes: Shape[] = [
    {
      id: 'square',
      lines: [
        { from: { x: 50, y: 50 }, to: { x: 200, y: 50 } },
        { from: { x: 200, y: 50 }, to: { x: 200, y: 200 } },
        { from: { x: 200, y: 200 }, to: { x: 50, y: 200 } },
        { from: { x: 50, y: 200 }, to: { x: 50, y: 50 } }
      ]
    },
    {
      id: 'triangle',
      lines: [
        { from: { x: 100, y: 50 }, to: { x: 250, y: 200 } },
        { from: { x: 250, y: 200 }, to: { x: 50, y: 200 } },
        { from: { x: 50, y: 200 }, to: { x: 100, y: 50 } }
      ]
    },
    {
      id: 'pentagon',
      lines: [
        { from: { x: 150, y: 100 }, to: { x: 200, y: 100 } },
        { from: { x: 200, y: 100 }, to: { x: 200, y: 150 } },
        { from: { x: 200, y: 150 }, to: { x: 150, y: 200 } },
        { from: { x: 150, y: 200 }, to: { x: 100, y: 150 } },
        { from: { x: 100, y: 150 }, to: { x: 100, y: 100 } },
        { from: { x: 100, y: 100 }, to: { x: 150, y: 100 } }
      ]
    },
  ];

  getShapeIds(): string[] {
    return this.shapes.map(shape => shape.id);
  }

  getLines(shapeId: string): Observable<Line[]> {
    const shape = this.shapes.find(shape => shape.id === shapeId);
    if (shape) {
      return of(shape.lines);
    } else {
      return of([]);
    }
  }


  getShapeById(shapeId: string): Shape | undefined {
    return this.shapes.find(shape => shape.id === shapeId);
  }

  saveShapeToFile(shapeId: string, color: string): void {
    const shape = this.getShapeById(shapeId);
    if (shape) {
      shape.lines.forEach(line => {
        line.color = color;
      });
  
      const shapesData = JSON.stringify([shape]);
      const blob = new Blob([shapesData], { type: 'application/json' });
      saveAs(blob, 'shapes.json');
    }
  }

}