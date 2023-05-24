import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Line } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  getLines(): Observable<Line[]> {
    // Simulate fetching the lines from a data source
    const lines: Line[] = [
      { from: { x: 50, y: 50 }, to: { x: 200, y: 50 }, shapeId: 'shape1' },
      { from: { x: 200, y: 50 }, to: { x: 200, y: 200 }, shapeId: 'shape1' },
      { from: { x: 200, y: 200 }, to: { x: 50, y: 200 }, shapeId: 'shape1' },
      { from: { x: 50, y: 200 }, to: { x: 50, y: 50 }, shapeId: 'shape1' }
    ];

    return of(lines);
  }
}

