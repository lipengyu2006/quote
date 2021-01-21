var amount = 0.5;
var dirty = true;
var easing;


var slider = document.querySelector('#slider1');
slider.addEventListener('input', function() {
  amount = (slider.value/1000.0);
  if (easing) {
    amount = easing(amount);
  }
  dirty = true;
});
var easing_funs = document.querySelectorAll('input[name="easing"]');
easing_funs.forEach(function(input) {
  input.addEventListener('change', function() {
    amount = 0;
    slider.value = 1000 * amount;
    easing = eval(this.value);
    amount = easing(amount);
    dirty = true;
  });
});

var left_radius = 25;
var right_radius = 50;
var oscillate = true;

var canv = document.querySelector('#canvas');
canv.width = canv.getBoundingClientRect().width;
canv.height = 120;
var size = canv.getBoundingClientRect();
var W = size.width;
var H = size.height;
var left = new Vec2(W/5, H/2);
var right = new Vec2(W*3/4, H/2);


window.requestAnimationFrame(tick);

function tick() {
  if (!dirty) {
    window.requestAnimationFrame(tick);
    return;
  }

  //Draw
  var ctx = canv.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = 'black';

  var circle = new Path2D();
  circle.arc(left.x, left.y, left_radius, 0, 2*Math.PI);
  ctx.fillStyle = '#F00';
  ctx.fill(circle);
  ctx.stroke(circle);

  var circle = new Path2D();
  circle.arc(right.x, right.y, right_radius, 0, 2*Math.PI);
  ctx.fillStyle = '#00F';
  ctx.fill(circle);
  ctx.stroke(circle);

  var circle = new Path2D();
  var mid = left.mix(right, amount);
  circle.arc(mid.x, mid.y, mix(left_radius, right_radius, amount), 0, 2*Math.PI);
  ctx.fillStyle = 'rgb(' + Math.floor(mix(255, 0, amount)) + ',0,' + Math.floor(mix(0, 255, amount)) + ')';
  ctx.fill(circle);
  ctx.stroke(circle);

  dirty = false;
  window.requestAnimationFrame(tick);
}
