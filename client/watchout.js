'use strict';

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let asteroids = new Array(10);

let svg = d3.select('svg');
let width = +svg.attr('width');
let height = +svg.attr('height');
let g = svg.append('g');

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
        //let oldX = this.cx.baseVal.value;
        //let newX = Math.random() *
        return getRandomIntInclusive(1, width);
      })
      .attr('cy', function (d) {
        //return this.cy.baseVal.value + 1;
        return getRandomIntInclusive(1, height);
      });

  // Exit
  a.exit().remove();
}

update(asteroids);

console.log(d3);
d3.interval(() => {
  update(asteroids);
}, 1000);

