import { Component } from '@angular/core';
import { ShapeService } from './services/shape.service';
import { Line } from './models/line.model';
import { Shape } from './models/shape';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lines: Line[] = [];
  selectedColor: string = '';
  colors: string[] = ['red', 'green', 'blue', 'yellow'];
  shapes: string[] = [];
  selectedShapeId: string = '';

  constructor(private shapeService: ShapeService) {
    this.shapes = this.shapeService.shapes.map(shape => shape.id);
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  selectShape(shapeId: string) {
    this.selectedShapeId = shapeId;
    this.fetchLines(shapeId);
  }

  fetchLines(shapeId: string) {
    if (shapeId) {
      this.shapeService.getLines(shapeId).subscribe(lines => {
        this.lines = lines;
      });
    } else {
      this.lines = [];
    }
  }

  saveShape(): void {
    if (this.selectedShapeId && this.selectedColor) {
      this.shapeService.saveShapeToFile(this.selectedShapeId, this.selectedColor);
    }
  }
  
  loadShapes(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result as string;
        const loadedShapes = JSON.parse(data) as Shape[];
        this.fetchLines(loadedShapes[0].id);
        this.selectedColor = loadedShapes[0].lines[0]?.color || 'black';

      };
      reader.readAsText(file);
    }
  }
  
}
