/* code */
var Chess = function(element,c,onComplete){
  this.dragging = false;
  this.element = element;
  this.pieces = [];
  this.board = [];
  this.teams = [];
  this.turn = "w";
  this.moveDisabled = false;
  this.c = c;

  //get the piece at a point
  this.getPieceAt = function(x,y){
     for(i in this.pieces){
       if(this.pieces[i].x == x && this.pieces[i].y == y && !this.pieces[i].dead){
         return this.pieces[i];
       }
     }
     return null;
  }

  //pieces class
  this.Piece = function(deets){
    this.id = deets.id;
    this.img = new Image();
    this.img.src = deets.src;

    this.x = deets.x;
    this.y = deets.y;

    this.drawX = deets.x * c.t;
    this.drawY = deets.y * c.t;
    this.start = deets.start;

    this.team = deets.team;
    this.king = deets.king;
    this.dead = false;
    this.canMoveFunction = deets.canMove;

    this.canMove = function(x,y){
      return this.canMoveFunction(this.x,this.y,x,y);
    }

    this.move = function(x,y){
      this.x = x;
      this.y = y;
      this.drawX = x * c.t;
      this.drawY = y * c.t;
    }

    this.drag = function(x,y){
      this.drawX = x * c.t;
      this.drawY = y * c.t;
    }

    this.resetDraw = function(){
      this.drawX = this.x * c.t;
      this.drawY = this.y * c.t;
    }

    this.hasMoved = function(){
      var found = true;

      for(var i = 0; i < this.start[this.team].length; i++){
        if(this.start[this.team][i][0] == this.x && this.start[this.team][i][1] == this.y){
          found = false;
        }
      }

      return found;
    }

    this.replace = function(newPiece,name){
      this.id = name;
      this.img.src = newPiece.display[this.team];
      this.img.src = newPiece.display[this.team];
      this.canMoveFunction = newPiece.canMove;
    }
  }

  /* pieces */
  for(i in c.pieces){
    for(team in c.pieces[i].start){
      this.teams.push(team);
      for(num in c.pieces[i].start[team]){
        this.pieces.push(new this.Piece({
          id:i,
          src:c.pieces[i].display[team],
          x:c.pieces[i].start[team][num][0],
          y:c.pieces[i].start[team][num][1],
          team:team,
          king:c.pieces[i].king,
          canMove:c.pieces[i].canMove,
          start:c.pieces[i].start
        }));
      }
    }
  }

  // create canvas
  $(element).html("<canvas style='user-select:none;-webkit-user-select:none;position:absolute;top:0;left:0;z-index:40;' width='" + c.x*c.t + "' height='" + c.y*c.t + "'  class='chess-canvas'></canvas>"
                 +"<canvas style='user-select:none;-webkit-user-select:none;position:absolute;top:0;left:0;z-index:38;' width='" + c.x*c.t + "' height='" + c.y*c.t + "'  class='background-canvas'></canvas>");
  $(element).css('width',c.x*c.t).css('height',c.y*c.t);
  var ctx = $(element + ">.chess-canvas")[0].getContext('2d');
  var background = $(element + ">.background-canvas")[0].getContext('2d');

  //paint background
  for(var x = 0; x < c.x; x++){
      for(var y = 0; y < c.y; y++){
        if(y%2 == 1 && x%2 == 1){
          background.fillStyle = c.colors.odd;
        } else if(y%2 == 1 || x%2 == 1) {
          background.fillStyle = c.colors.even;
        } else {
          background.fillStyle = c.colors.odd;
        }
        background.fillRect(x*c.t,y*c.t,c.t,c.t);
      }
    }

  //render function
  this.render = function(){
    ctx.clearRect(0,0,c.t*c.x,c.t*c.y);
    ctx.fillStyle = "rgba(0,204,0,0.4)";
    /* draw our pieces */
    for(i in this.pieces){
      var piece = this.pieces[i];
      if(!piece.dead && this.dragging != piece){
        if(piece.team == this.turn && !this.moveDisabled){
          ctx.fillRect(piece.drawX,piece.drawY,c.t,c.t);
        }
        ctx.drawImage(piece.img,piece.drawX,piece.drawY,c.t,c.t);
      }
    }

    if(this.dragging){
      ctx.drawImage(this.dragging.img,this.dragging.drawX,this.dragging.drawY,c.t,c.t);
    }
  }

  //touchdown
  this.touchdown = function(x,y){
    var piece = this.getPieceAt(Math.floor(x/c.t),Math.floor(y/c.t));
    if(piece.team == this.turn && !this.moveDisabled){
        this.dragging = piece;
    }
  }

  //flyby
  this.flyby = function(x,y){
    if(this.dragging){
      this.dragging.drawX = x - c.t/2;
      this.dragging.drawY = y - c.t/2;
    }
  }

  //takeoff
  this.takeoff = function(x,y){
    if(this.dragging){
      var currentPiece = this.getPieceAt(Math.floor(x/c.t),Math.floor(y/c.t));

      //move character if it can move
      if(this.dragging.canMove(Math.floor(x/c.t),Math.floor(y/c.t))){
        //now change team
        if(this.turn == 'w'){
          this.turn = 'b';
        } else {
          this.turn = 'w';
        }
        // disable the mvoe so thr player can't have fun with the apponent
        this.moveDisabled = true;
        if (currentPiece &&this.dragging.team==currentPiece.team){
          if (this.dragging.y < currentPiece.y){
            this.dragging.move(Math.floor(x/c.t),Math.floor(y/c.t-2));
            currentPiece.move(Math.floor(x/c.t),Math.floor(y/c.t-3));
            console.log("not this side");
            
          }
          else {
            
            this.dragging.move(Math.floor(x/c.t),Math.floor(y/c.t+1));
            currentPiece.move(Math.floor(x/c.t),Math.floor(y/c.t+2));
          }
        }
        else {
          this.dragging.move(Math.floor(x/c.t),Math.floor(y/c.t));
          if(currentPiece ){
            currentPiece.dead = true;
        }
        }
        


        // notify the controller that a turn has been completed successfully
        if(onComplete){
          onComplete();
        }
      } else {
        this.dragging.resetDraw();
      }

      //check victory condition
      if(this.checkVictory()){
        this.victory(this.dragging.team);
      }
    }

    //reset dragging value
    this.dragging = false;
  }

  //upon victory
  this.victory = function(team){
    alert(team + " won");
  }

  //export
  this.export = function(){
    var pieces = "";
    for(i in this.pieces){
      if(!this.pieces[i].dead){
        pieces = pieces + this.pieces[i].team + this.pieces[i].x + this.pieces[i].y + this.pieces[i].id + "!";
      }
    }
    return pieces + this.turn;
  }

  //import
  this.import = function(data){
    var d = data.split('!');
    this.pieces = [];

    for(i in d){
      if(d[i] != ""){
        if(i == d.length - 1){
          this.turn = d[i];
        } else {
           this.pieces.push(new this.Piece({
              id:d[i].substr(3),
              src:this.c.pieces[d[i].substr(3)].display[d[i].substr(0,1)],
              x:d[i].substr(1,1),
              y:d[i].substr(2,1),
              team:d[i].substr(0,1),
              king:this.c.pieces[d[i].substr(3)].king,
              canMove:this.c.pieces[d[i].substr(3)].canMove,
              start:this.c.pieces[d[i].substr(3)].start
            }));
        }
      } else {
        if(i == d.length - 1){
          this.turn = prompt('What team are you? Please enter "w" for White, or "b" for Black.');
        }
      }
    }
  }

  this.checkVictory = function(){
    var victory = false;

    for(i in this.pieces){
      if(this.pieces[i].dead && this.pieces[i].king){
        victory = true;
      }
    }

    return victory;
  }

  this.checkForPiece = function(x,y){
    if(this.getPieceAt(x,y)){
      return true;
    } else {
      return false;
    }
  }

  this.isClearPath = function(x1,y1,x2,y2){
    var clear = true;
    var x = x1;
    var y = y1;

    while(x != x2 || y != y2){
      if(x > x2){
        x--;
      } else if (x < x2){
        x++;
      }

      if(y > y2){
        y--;
      } else if (y < y2){
        y++;
      }

      if(this.checkForPiece(x,y) && !(x == x2 && y == y2)){
        clear = false;
      }
    }

    return clear;
  }
}
