'use strict';

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let svg = d3.select('svg');
let width = +svg.attr('width');
let height = +svg.attr('height');
let asteroidBelt = svg.append('g').attr('id', 'asteroidBelt');
let player = svg.append('g').attr('id', 'player');

let asteroids = [];
let numAsteroids = 10;
for (var i = 0; i < numAsteroids; i++) {
  asteroids.push({
    name: 'asteroid'+i,
    x: getRandomIntInclusive(1, width),
    y: getRandomIntInclusive(1, height)
  });
}

let asteroidTransition = d3.transition()
  .duration(500)
  .ease(d3.easeLinear);

  /*
let tweenFunction = function tweenFunction(endData) {
  let asteroid = d3.select(this);
  let startX = this.cx.baseVal.value;
  let startY = this.cx.baseVal.value;
  console.log(endData);
  console.log(startX, startY);

  return function (t) {
    return asteroid.attr('cx', startX + ()t)
      .attr('cy', startY + t);
  }
}
*/

let update = function update(data) {
  let a = asteroidBelt.selectAll('circle').data(data);

  // Update
  //a.data(data);
  a.attr('class', 'asteroid update');
    //.transition(asteroidTransition);

  // Enter
  a.enter().append('circle')
      .attr('class', 'asteroid enter')
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; })
      .attr('r', 15)
      //.attr('r', 0)
      //.transition().duration(500).attr('r', 15)
      //.each(function (d, i) {
        //d3.select(this).transition()
          //.duration(500)
          //.ease(d3.easeQuadIn)
          //.attr('r', 15)
      //})
    .merge(a)
      .each(function (d, i) {
        d3.select(this).transition()
          .duration(2000)
          .ease(d3.easePolyInOut)
          .attr('cx', function (d) {
            return getRandomIntInclusive(1, width);
          })
          .attr('cy', function (d) {
            return getRandomIntInclusive(1, height);
          })
      });

  // Exit
  a.exit().remove();

  //return a.transition().duration(400).tween('custom', tweenFunction);
}

update(asteroids);

console.log(d3);
d3.interval(() => {
  update(asteroids);
}, 2000);

