'use strict';

let asteroids = [{name: 'asteroid1', x: 100, y: 100}];

let svg = d3.select('svg');
let width = +svg.attr('width');
let height = +svg.attr('height');
let g = svg.append('g').attr('transform', 'translate(40, 40)');

let update = function update(data) {
  let a = g.selectAll('circle').data(data);

  // Update
  //a.data(data);
  a.attr('class', 'update');

  // Enter
  a.enter().append('circle')
      .attr('class', 'enter')
      .attr('r', 15)
    .merge(a)
      .attr('cx', function (d) {
        return this.cx.baseVal.value + 1;
      })
      .attr('cy', function (d) {
        return this.cy.baseVal.value + 1;
      });

  // Exit
  a.exit().remove();
}

update(asteroids);

console.log(d3);
d3.interval(() => {
  update(asteroids);
}, 1000);

