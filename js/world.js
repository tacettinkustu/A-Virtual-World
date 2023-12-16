class World {
  constructor(graph, roadwidth = 100, roadRoundness = 10) {
    this.graph = graph;
    this.roadwidth = roadwidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];
    this.roadBorders = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadwidth, this.roadRoundness)
      );
    }

    this.intersections = Polygon.break(
      this.envelopes[0].poly,
      this.envelopes[1].poly
    );

    this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
  }

  draw(ctx) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: '#BBB', stroke: '#BBB', lineWidth: 15 });
    }

    for (const seg of this.graph.segments) {
      seg.draw(ctx, { color: 'white', width: 4, dash : [10, 10] });
    }

    for (const seg of this.roadBorders) {
      seg.draw(ctx, { color: 'white', width: 4 });
    }
  }
}
