$( document ).ready(function() {

  var DEPTH = 3;
  var MAX_FLAKES = 9;
  var MIN_FLAKES = 6;
  var CANVAS_HEIGHT = 280;
  var CANVAS_WIDTH = 280;

  var SNOWFLAKE_RADIUS = 50;
  var SPACE_BETWEEN = 0;
  var SNOWFLAKE_SIZE = (SNOWFLAKE_RADIUS + SPACE_BETWEEN * (DEPTH + 1))
  var canvases = []

  function createCanvases(num) {
    var i;
    for(i = 0; i <= num; i++) {
      canvases.push(createCanvasObj(i));
    }
    return canvases;
  }

  function createCanvasObj(num) {
    var canvasObj = {};
    canvasObj['id'] = num;
    canvasObj['canvas'] = createCanvas(num);
    canvasObj['context'] = createContext(canvasObj['canvas']);
    canvasObj['snowflakeGenerator'] = createSnowflakeInstance(canvasObj['canvas']);
    attachEvents(canvasObj);
    return canvasObj;
  }

  function createCanvas(num) {
    var canvas = document.createElement('canvas');
    canvas.id     = "canvas-" + num;
    canvas.width  = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    document.body.appendChild(canvas);
    return canvas;
  }

  function createContext(domEle) {
    context = domEle.getContext("2d");
    context.canvas.width  = CANVAS_WIDTH;
    context.canvas.height = CANVAS_HEIGHT;
    context.fillStyle = 'rgba(198, 45, 66, 0.1)';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return context;
  }

  function createSnowflakeInstance(canvasEle) {
    var snowFlake = new SnowflakeGenerator(canvasEle);
    return snowFlake;
  }

  function attachEvents(canvasInstance) {
    $(canvasInstance.canvas).on('mouseenter', function (e){
      console.log('mouseenter ' + canvasInstance.id);
        // $( canvasInstance.canvas ).animate({
        //   opacity: 0,
        // }, 800, function() {
        //   // Animation complete.
        //   canvasInstance.snowflakeGenerator.Draw();
        // }).animate({
        //   opacity: 1,
        // }, 800, function() {
        //   // Animation complete.
        //
        // });

    });
    $(canvasInstance.canvas).on('mouseout', function (e){
      console.log('mouseout ' + canvasInstance.id);
      //canvasInstance.snowflakeGenerator.Draw();
    });
  }




  function SnowflakeGenerator(canvasElement) {
      this.element = canvasElement;

      var numberInRow = Math.floor(window.innerWidth / SNOWFLAKE_SIZE) + 1;
      var numberInColumn = Math.floor(window.innerHeight / SNOWFLAKE_SIZE) + 1;

      this.randomParameters = [];
      for (i = 0; i <= (numberInRow * numberInColumn); i++) {
          this.randomParameters[i] = Math.floor(Math.random() * (MAX_FLAKES - MIN_FLAKES)) + MIN_FLAKES;
      }

    	this.snowFlakes = [];
      this.isHovered = false;
    	var randomNum = 0;
      var rowNum = 0;

      var min = MIN_FLAKES;
      var max =MAX_FLAKES;
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    	this.snowFlakes.push(
      	{
            x: CANVAS_WIDTH/2,
            y: CANVAS_HEIGHT/2,
            r: SNOWFLAKE_RADIUS,
            d: DEPTH,
            f: randomNum
        }
      )
  }

  SnowflakeGenerator.prototype.DrawFlake = function(context, flake) {
      context.save();
      context.translate(flake.x, flake.y);
      context.fillStyle = "rgba(198, 45, 66," + (1 - (1 / (flake.d + 4))).toString() + ")";
      // context.fillRect(-1, -3, 2, 6);
      // context.fillRect(-3, -1, 6, 2);


      context.fillRect(-1.5, -3.5, 3, 7);
      context.fillRect(-3.5, -1.5, 7, 3);
      var i = 0;
      if (flake.d > 0) {
          for (i = 0; i < flake.f; i++) {
              context.save();
              context.rotate(i * (Math.PI * 2) / flake.f);
              this.DrawFlake(context, {
                  x: flake.r - 2,
                  y: 0,
                  r: flake.r / 2,
                  d: flake.d - 1,
                  f: this.randomParameters[flake.d]
              });
              context.restore();
          }
      }
      i = 0;
      context.restore();
  };

  SnowflakeGenerator.prototype.Draw = function(options) {
      context = this.element.getContext("2d");
      context.canvas.width  = CANVAS_WIDTH;
      context.canvas.height = CANVAS_HEIGHT;
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      for (i in this.snowFlakes) {
          this.DrawFlake(context, this.snowFlakes[i]);
      }

      line = 0;
  };






  canvases = createCanvases(135);
  canvases.forEach(function(canvas){

    canvas.snowflakeGenerator.Draw();
  });

  setInterval(function() {
    var canvas = canvases[Math.floor(Math.random() * (canvases.length - 0+ 1)) + 0];
    var canvas2 = canvases[Math.floor(Math.random() * (canvases.length - (canvases.length/2) + 1)) + (canvases.length/2)];
    $( canvas.canvas ).animate({
      opacity: 0,
    }, 2000, function() {
      // Animation complete.
      var min = MIN_FLAKES;
      var max = MAX_FLAKES;
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

      canvas.snowflakeGenerator.snowFlakes[0].f = randomNum;
      canvas.snowflakeGenerator.Draw();
    }).animate({
      opacity: 1,
    }, 2000, function() {
      // Animation complete.
    });

    $( canvas2.canvas ).animate({
      opacity: 0,
    }, 2000, function() {
      // Animation complete.
      var min = MIN_FLAKES;
      var max = MAX_FLAKES;
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

      canvas.snowflakeGenerator.snowFlakes[0].f = randomNum;
      canvas.snowflakeGenerator.Draw();
    }).animate({
      opacity: 1,
    }, 2000, function() {
      // Animation complete.
    });

  }, 800);




  //snowflake = new SnowflakeGenerator(snowflakeCanvas[0]);

  //snowflake.Draw();
});
