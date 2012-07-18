(function() {

  jQuery(function() {
    var canvas, colorPeriod, context, drawFrame, framerate, frametimes, gravity, hue, lightness, maxRad, minRad, movePeriod, oscillatePeriod, pickColor, pickRadius, probe, radius, saturation, setPosition, sl, t, thrust, vmax, vx, vy, x, y,
      _this = this;
    x = 0;
    vx = 0;
    y = 0;
    vy = 0;
    t = 0;
    thrust = 3;
    vmax = 20;
    gravity = 2;
    framerate = 60;
    frametimes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    radius = 20;
    minRad = 5;
    maxRad = 50;
    hue = 180;
    saturation = ",100%";
    lightness = ",50%";
    sl = saturation + lightness;
    movePeriod = 5000;
    oscillatePeriod = 2000;
    colorPeriod = 10000;
    canvas = jQuery("#canvas")[0];
    context = canvas.getContext("2d");
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;

    pickColor = function() {
      return hue = 180 + 180 * Math.sin((t % colorPeriod) / colorPeriod * 2 * Math.PI);
    };
    pickRadius = function() {
      return radius = minRad + (minRad + maxRad) / 2 + (minRad + maxRad) / 2 * Math.sin((t % oscillatePeriod) / oscillatePeriod * 2 * Math.PI);
    };
    setPosition = function() {
      var ax, ay, dist, dx, dy, thetai, vxp, vyp;
      thetai = 2 * Math.PI * Math.random();
      ax = thrust * Math.cos(thetai);
      ay = thrust * Math.sin(thetai);
      dx = x - canvas.width / 2;
      dy = y - canvas.width / 2;
      dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      ax -= gravity * dx / dist;
      ay -= gravity * dy / dist;
      vxp = vx + ax;
      vyp = vy + ay;
      if (Math.sqrt(Math.pow(vxp, 2) + Math.pow(vyp, 2)) <= vmax) {
        vx = vxp;
        vy = vyp;
      }
      x += vx;
      if (x < 0) x += canvas.width;
      if (x > canvas.width) x -= canvas.width;
      y += vy;
      if (y < 0) y += canvas.height;
      if (y > canvas.height) return y -= canvas.height;
    };
    probe = function(x) {
      var probeEnd, probeStart, probeTime;
      probeStart = new Date().getTime();
      x();
      probeEnd = new Date().getTime();
      probeTime = probeEnd - probeStart;
      return console.log("probe time " + probeTime);
    };
    drawFrame = function() {
      var grad;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      grad = context.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, "hsla(" + hue + sl + ",1.0)");
      grad.addColorStop(.5, "hsla(" + hue + sl + ",1.0)");
      grad.addColorStop(1, "hsla(" + hue + sl + ",0.0)");
      context.fillStyle = grad;
      return context.fill();
    };
    x = canvas.width / 2;
    y = canvas.height / 2;
    return setInterval(function() {
      var measured_framerate, now, _ref;
      now = new Date();
      t = now.getTime();
      pickColor();
      pickRadius();
      setPosition();
      drawFrame();
      [].splice.apply(frametimes, [0, 9].concat(_ref = frametimes.slice(1, 10))), _ref;
      frametimes[9] = t;
      measured_framerate = 10000 / (frametimes[9] - frametimes[0]);
      return jQuery("#framecounter").text("FPS: " + measured_framerate);
    }, 1000 / framerate);
  });

}).call(this);
