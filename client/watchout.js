'use strict';

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random



let getRandomIntInclusive = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let svg = d3.select('svg');
let width = +svg.attr('width');
let height = +svg.attr('height');
let asteroidBelt = svg.append('g').attr('id', 'asteroidBelt');
svg.append('g').attr('id', 'playerGroup');

let asteroids = [];
let numAsteroids = 10;
for (var i = 0; i < numAsteroids; i++) {
  asteroids.push({
    name: 'asteroid' + i,
    x: getRandomIntInclusive(1, width),
    y: getRandomIntInclusive(1, height)
  });
}

let player = [{
  x: width / 2,
  y: height / 2
}];




let drag = d3.drag()
  .on('drag', function(d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  });

let checkCollisions = function checkCollisions(asteroid) {
  d3.select('#player').each(function (player) {
    let aX = asteroid.cx.baseVal.value;
    let aY = asteroid.cy.baseVal.value;

    let separation = Math.sqrt(Math.pow((aX - player.x), 2) + Math.pow((aY - player.y), 2));

    if (separation < 2 * 15) {
      console.log(separation);
      console.log('hit detected');
    }
  });
};

let update = function update(data) {
  let p = d3.select('g#playerGroup').selectAll('circle').data(player);
  p.enter().append('circle')
    .attr('id', 'player')
    .attr('class', 'player')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 15)
    .call(drag);

  let a = asteroidBelt.selectAll('circle').data(data);

  // Update
  a.attr('class', 'asteroid update');

  // Enter
  a.enter().append('circle')
    .attr('class', 'asteroid enter')
    // .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 15)
  .merge(a)
    .each(function (d, i) {
      d3.select(this).transition()
        .duration(2000)
        .tween('custom', function () {
          let asteroid = this;

          return function (t) {
            checkCollisions(asteroid);
            // Calculate collisions
            // calculate inbetween x
            // calculate inbetween y
            // return new (inbetween) position
          };
        })
        // .attr('transform', d => 'translate(' + getRandomIntInclusive(1, width) + ',' + getRandomIntInclusive(1, height) + ')');
        .attr('cx', function (d) {
          return getRandomIntInclusive(1, width);
        })
        .attr('cy', function (d) {
          return getRandomIntInclusive(1, height);
        });
    });

  // Exit
  a.exit().remove();

};

update(asteroids);

d3.interval(() => {
  update(asteroids);
}, 2000);

