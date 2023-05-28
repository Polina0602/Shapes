import { ChangeDetectorRef, Component } from '@angular/core';
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
  selectedColor: string = 'black';
  colors: string[] = ['red', 'green', 'blue', 'yellow'];
  shapes: any[] = [];
  selectedShape: Shape | undefined;
  selectedShapeId: string = '';

  constructor(private shapeService: ShapeService, private cdRef: ChangeDetectorRef) {
    this.shapes = this.shapeService.shapes.map(shape => shape.id);
  }

  ngOnInit() {
    this.showShapes();
  }

  getShapeColor(shapeId: string): string {
    if (shapeId === this.selectedShapeId) {
      return this.selectedColor;
    } else {
      const selectedShape = this.shapes.find(shape => shape.id === shapeId);
      if (selectedShape) {
        const line = selectedShape.lines.find((line : Line) => line.shapeId === this.selectedShapeId);
        return line ? line.color || '' : '';
      }
      return '';
    }
  }  

  showShapes() {
    this.shapes = this.shapeService.shapes;
    if (this.shapes.length > 0) {
      for (let i = 0; i < this.shapes.length; i++) {
        const shape = this.shapes[i];
        if (shape.lines.length > 0) {
          const firstLine = shape.lines[0];
          this.selectShape(firstLine.shapeId);
          break;
        }
      }
    }
  }



  selectColor(color: string) {
    this.selectedColor = color;
    
    const selectedShape = this.shapes.find(shape => shape.id === this.selectedShapeId);
    if (selectedShape) {
      selectedShape.lines.forEach((line: Line) => {
        line.color = (selectedShape.id === this.selectedShapeId) ? color : line.color;
      });
    }
  } 
  

  selectShape(shapeId: string) {
    this.selectedShapeId = shapeId;
    
    this.shapes.forEach(shape => {
      shape.lines.forEach((line: any) => {
        line.color = (line.shapeId === shapeId) ? this.selectedColor : 'black';
      });
    });
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

  loadShapes(): void {
    this.shapeService.loadShapes().subscribe(shapes => {
      this.selectedShape = undefined;
      this.shapes = shapes;
      if (this.shapes.length > 0) {
        const firstShapeId = this.shapes[0].id;
        this.selectShape(firstShapeId);
      }
      this.cdRef.detectChanges();
      }, error => {
      console.error('Failed to load shapes', error);
    });
  }
  
  
  
  
  
}
