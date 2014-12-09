$( document ).ready(function() {

  var DEPTH = 2;
  var MAX_FLAKES = 10;
  var MIN_FLAKES = 4;

  var SNOWFLAKE_RADIUS = 22;
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
    debugger;
    return canvasObj;
  }

  function createCanvas(num) {
    var canvas = document.createElement('canvas');
    canvas.id     = "canvas-" + num;
    canvas.width  = 100;
    canvas.height = 100;
    document.body.appendChild(canvas);
    return canvas;
  }

  function createContext(domEle) {
    context = domEle.getContext("2d");
    context.canvas.width  = 100;
    context.canvas.height = 100;
    context.fillStyle = 'rgba(198, 45, 66, 0.1)';
    context.fillRect(0, 0, 100, 100);
    return context;
  }

  function createSnowflakeInstance(canvasEle) {
    var snowFlake = new SnowflakeGenerator(canvasEle);
    return snowFlake;
  }

  function attachEvents(canvasInstance) {
    $(canvasInstance.canvas).on('mouseenter', function (e){
      console.log('mouseenter ' + canvasInstance.id);
      canvasInstance.snowflakeGenerator.snowFlakes[0].r = 30
      canvasInstance.snowflakeGenerator.Draw();
    });
    $(canvasInstance.canvas).on('mouseout', function (e){
      console.log('mouseout ' + canvasInstance.id);
      canvasInstance.snowflakeGenerator.snowFlakes[0].r = 20
      canvasInstance.snowflakeGenerator.Draw();
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

      var min = 3;
      var max = 18;
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    	this.snowFlakes.push(
      	{
            x: 50,
            y: 50,
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
      context.fillRect(-1, -3, 2, 6);
      context.fillRect(-3, -1, 6, 2);
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
      context.canvas.width  = 100;
      context.canvas.height = 100;
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.fillRect(0, 0, 100, 100);

      for (i in this.snowFlakes) {
          this.DrawFlake(context, this.snowFlakes[i]);
      }

      line = 0;
  };






  canvases = createCanvases(500);
  canvases.forEach(function(canvas){

    canvas.snowflakeGenerator.Draw();
  });


  //snowflake = new SnowflakeGenerator(snowflakeCanvas[0]);

  //snowflake.Draw();
});
