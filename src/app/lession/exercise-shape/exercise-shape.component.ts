import { Location } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

import Konva from 'konva';
@Component({
  selector: 'app-exercise-shape',
  templateUrl: './exercise-shape.component.html',
  styleUrls: ['./exercise-shape.component.css'],
})
export class ExerciseShapeComponent implements AfterViewInit {
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  tr!: Konva.Transformer;
  selectionRectangle!: Konva.Rect;
  shapes: Konva.Shape[] = [];
  x1: number | undefined;
  y1: number | undefined;
  x2: number | undefined;
  y2: number | undefined;

  width = window.innerWidth;
  height = window.innerHeight;

  constructor(private readonly _location: Location) {}

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.width,
      height: this.height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.tr = new Konva.Transformer();
    this.layer.add(this.tr);

    this.selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
    });
    this.layer.add(this.selectionRectangle);

    this.stage.on('mousedown touchstart', (e) => this.handleMouseDown(e));
    this.stage.on('mousemove touchmove', (e) => this.handleMouseMove(e));
    this.stage.on('mouseup touchend', (e) => this.handleMouseUp(e));
    this.stage.on('click tap', (e) => this.handleClick(e));
  }

  handleMouseDown(e: any) {
    if (e.target !== this.stage) {
      return;
    }
    e.evt.preventDefault();
    const pointerPos = this.stage.getPointerPosition();
    if (pointerPos) {
      this.x1 = pointerPos.x;
      this.y1 = pointerPos.y;
      this.x2 = pointerPos.x;
      this.y2 = pointerPos.y;

      this.selectionRectangle.visible(true);
      this.selectionRectangle.width(0);
      this.selectionRectangle.height(0);
    }
  }

  handleMouseMove(e: any) {
    if (!this.selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    const pointerPos = this.stage.getPointerPosition();
    if (pointerPos) {
      this.x2 = pointerPos.x;
      this.y2 = pointerPos.y;

      this.selectionRectangle.setAttrs({
        x: Math.min(this.x1!, this.x2!),
        y: Math.min(this.y1!, this.y2!),
        width: Math.abs(this.x2! - this.x1!),
        height: Math.abs(this.y2! - this.y1!),
      });
    }
  }

  handleMouseUp(e: any) {
    if (!this.selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();
    setTimeout(() => {
      this.selectionRectangle.visible(false);
    });

    const box = this.selectionRectangle.getClientRect();
    const selected = this.shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    this.tr.nodes(selected);
  }

  handleClick(e: any) {
    if (this.selectionRectangle.visible()) {
      return;
    }

    if (e.target === this.stage) {
      this.tr.nodes([]);
      return;
    }

    if (!e.target.hasName('shape')) {
      return;
    }

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = this.tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      this.tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      const nodes = this.tr.nodes().slice();
      nodes.splice(nodes.indexOf(e.target), 1);
      this.tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      const nodes = this.tr.nodes().concat([e.target]);
      this.tr.nodes(nodes);
    }
  }

  addRectangle(x: number) {
    const rectangle = new Konva.Rect({
      x,
      y: 30, // Adjust the y-coordinate for the desired position on top
      width: 100,
      height: 80,
      fill: 'red',
      name: 'shape',
      draggable: true,
    });
    this.layer.add(rectangle);
    this.shapes.push(rectangle);
  }

  addTriangle(x: number) {
    const triangle = new Konva.RegularPolygon({
      x,
      y: 80,
      sides: 3,
      radius: 50,
      fill: 'blue',
      name: 'shape',
      draggable: true,
    });
    this.layer.add(triangle);
    this.shapes.push(triangle);
  }

  addCircle(x: number) {
    const circle = new Konva.Circle({
      x,
      y: 70, // Adjust the y-coordinate for the desired position on top
      radius: 40,
      fill: 'yellow',
      name: 'shape',
      draggable: true,
    });
    this.layer.add(circle);
    this.shapes.push(circle);
  }

  deleteSelected() {
    const selectedNodes = this.tr.nodes();
    selectedNodes.forEach((node) => {
      // Ensure the node is a Konva.Shape before attempting to remove
      if (node instanceof Konva.Shape) {
        // Remove the shape from the Konva layer
        node.remove();
        // Remove the shape from the array that tracks shapes
        const index = this.shapes.indexOf(node);
        if (index !== -1) {
          this.shapes.splice(index, 1);
        }
      }
    });

    // Clear the transformer selection
    this.tr.nodes([]);
    // Batch draw to update the stage
    this.layer.batchDraw();
  }

  returnToBackPage() {
    this._location.back();
  }
}
