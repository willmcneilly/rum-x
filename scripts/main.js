$( document ).ready(function() {

  var DEPTH = 2;
  var MAX_FLAKES = 8;
  var MIN_FLAKES = 4;

  var SNOWFLAKE_RADIUS = 20
  var SPACE_BETWEEN = 20;
  var SNOWFLAKE_SIZE = (SNOWFLAKE_RADIUS + SPACE_BETWEEN * (DEPTH + 1))



  function setCanvasSize(snowflakeCanvas) {
    var w = $(window).width();
    var h = $(window).width();
    $(snowflakeCanvas).width(w).height(h);
  }

  function SnowflakeGenerator(canvasElement) {
      this.element = canvasElement;
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      var numberInRow = Math.floor(window.innerWidth / SNOWFLAKE_SIZE) + 1;
      var numberInColumn = Math.floor(window.innerHeight / SNOWFLAKE_SIZE) + 1;

      this.randomParameters = [];
      for (i = 0; i <= (numberInRow * numberInColumn); i++) {
          this.randomParameters[i] = Math.floor(Math.random() * (MAX_FLAKES - MIN_FLAKES)) + MIN_FLAKES;
      }

    	this.snowFlakes = [];
    	var randomNum = 0;



      var rowNum = 0;
    	for (i = 0; i <= numberInColumn; i++) {

        for (e = 0; e<= numberInRow; e++) {
          var min = 3
          var max = 15
          randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

        	this.snowFlakes.push(
          	{
                x: SNOWFLAKE_SIZE * e,
                y: SNOWFLAKE_SIZE * i,
                r: SNOWFLAKE_RADIUS,
                d: DEPTH,
                f: randomNum
            }
          )
        }
      }


  }

  SnowflakeGenerator.prototype.DrawFlake = function(context, flake) {
      context.save();
      context.translate(flake.x, flake.y);
      context.fillStyle = "rgba(0,191,255," + (1 - (1 / (flake.d + 4))).toString() + ")";
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
      context.canvas.width  = window.innerWidth;
      context.canvas.height = window.innerHeight;
      context.fillStyle = '#fff';
      context.fillRect(0, 0, this.width, this.height);

      for (i in this.snowFlakes) {
          this.DrawFlake(context, this.snowFlakes[i]);
      }

      line = 0;
  };



  var snowflakeCanvas = $('#canvas');
  //setCanvasSize(snowflakeCanvas);

  snowflake = new SnowflakeGenerator(snowflakeCanvas[0]);

  snowflake.Draw();
});
