import { Component, OnInit } from '@angular/core';
import { ShapeService } from './services/shape.service';
import { Line } from './models/line.model';
import { ShapeId } from 'src/enums/shape-id.enum';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  lines: Line[] = [];
  selectedShapeId: string | null = null;
  shapeIds: string[] = Object.values(ShapeId);
  isActive: boolean = false;
  selectedButtonId: string | null = null;


  constructor(private shapeService: ShapeService) {}

  ngOnInit() {
    this.fetchLines();
  }

  fetchLines() {
    this.shapeService.getLines().subscribe(lines => {
      this.lines = lines;
    });
  }

  toggleActive(buttonId: string) {
    this.selectedButtonId = this.selectedButtonId === buttonId ? null : buttonId;
  }
  

  selectShape(shapeId: string) {
    this.selectedShapeId = shapeId;
  }

  selectColor(color: string) {
    if (this.selectedShapeId !== null) {
      // Paint the lines of the selected shape with the chosen color
      this.lines.forEach((line) => {
        if (line.shapeId === this.selectedShapeId) {
          line.color = color;
        }
      });

      console.log(`Painting shape ${this.selectedShapeId} with ${color} color.`);
    }
  }
}
