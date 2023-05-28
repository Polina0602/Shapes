import { EventEmitter, Injectable } from "@angular/core";
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { Line } from "../models/line.model";
import { Shape } from "../models/shape";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) { }

  shapesLoaded: EventEmitter<void> = new EventEmitter<void>();

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

  saveShapeData(shapeId: string, color: string): Observable<any> {
    const shape = this.getShapeById(shapeId);
    if (shape) {
      shape.lines.forEach(line => {
        line.color = color;
      });
  console.log('The saving shape is ', shape);
  
      const url = 'http://localhost:3000/shapes';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const options = { headers: headers };
  
      return this.http.post(url, shape, options).pipe(
        catchError(error => {
          console.error('Failed to save shape data', error);
          return throwError('Error saving shape data');
        })
      );
    } else {
      return throwError('Invalid shape ID');
    }
  }
  
  saveShapeToFile(shapeId: string, color: string): void {
    this.saveShapeData(shapeId, color).subscribe(() => {
      console.log('Shape data saved successfully');
    }, error => {
      console.error('Failed to save shape data', error);
    });
  }
  
  loadShapes(): Observable<Shape[]> {
    const filePath = 'http://localhost:3000/shapes';
  
    return this.http.get<Shape[]>(filePath).pipe(
      catchError(error => {
        console.error('Failed to load shapes', error);
        return throwError('Error loading shapes');
      })
    );
  }
  

  loadShapesFromFile(): Observable<Shape[]> {
    const filePath = 'http://localhost:3000/shapes';
  
    return this.http.get<Shape[]>(filePath);
  }

  
  
  
  

}