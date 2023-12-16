class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = canvas.getContext('2d');

    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this));

    this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this));

    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    this.canvas.addEventListener('mouseup', (e) => {
      if (e.button == 0 && this.dragging) {
        this.dragging = false;
      }
    });
  }

  #handleMouseMove(e) {
    this.mouse = new Point(e.offsetX, e.offsetY);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
    if (this.dragging) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  #handleMouseDown(e) {
    if (e.button == 2) {
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }
    if (e.button == 0) {
      if (this.hovered) {
        this.#selectPoint(this.hovered);
        this.dragging = true;
        return;
      }
      this.graph.addPoint(this.mouse);
      this.#selectPoint(this.mouse);
      this.hovered = this.mouse;
    }
  }

  #selectPoint(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    if (this.selected == point) {
      this.selected = null;
    }
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
