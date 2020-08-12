/* configs */
//landing on a tile kills the person under the tile

/* functions avaliable for scripting canMove functions */

//Piece object
  //this.hasMoved() - returns whether the unit has moved
  //this.team - the team of the piece
  //this.replace(object of piece, name of piece) - replace the piece with another piece

  //chess.victory(team) - passed team has won
  //chess.checkForPiece(x,y) - returns true if there is a piece there.
  //chess.isClearPath(x1,y1,x2,y2) - returns true if the path has no other characters (ignoring the landing tile)
  //chess.getPieceAt(x,y) - gets the piece at a location

var c = {
  t:40,
  x:8,
  y:8,
  colors:{odd:"#E0E0E0",even:"#9E9E9E"},
  extraGraphics:[
    {x:'0',y:'0',data:""},
    {x:'1',y:'1',data:""},
  ],
  pieces:{
    pawn:{
      display:{
        w:"img/pawn-w.png",
        b:"img/pawn-b.png",
      },
      start: {
        w:[[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],
        b:[[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]],
      },
      canMove:function(x1,y1,x2,y2){
        if(chess.getPieceAt(x2,y2)){
          if(chess.getPieceAt(x2,y2).team == this.team){
            return false;
          }
        }

        if(this.team == "w"){
          if((x2-x1==1 && Math.abs(y2-y1)==1 && chess.checkForPiece(x2,y2)) || (x2-x1==1 && y2-y1==0 && !chess.checkForPiece(x2,y2))){
            if(x2 == 7){
              this.replace(c.pieces.queen,"queen");
            }
            return true;
          } else if(!this.hasMoved() && (x2-x1==2 && Math.abs(y2-y1)==0) && !chess.checkForPiece(x2,y2)){
            if(x2 == 7){
              this.replace(c.pieces.queen,"queen");
            }
            return true;
          } else {
            return false;
          }
        } else {
          if((x2-x1==-1 && Math.abs(y2-y1)==1 && chess.checkForPiece(x2,y2)) || (x2-x1==-1 && y2-y1==0 && !chess.checkForPiece(x2,y2))){
            if(x2 == 0){
              this.replace(c.pieces.queen,"queen");
            }
            return true;
          } else if(!this.hasMoved() && (Math.abs(x2-x1)==2 && Math.abs(y2-y1)==0) && !chess.checkForPiece(x2,y2)){
            if(x2 == 0){
              this.replace(c.pieces.queen,"queen");
            }
            return true;
          } else {
            return false;
          }
        }
      }
    },
    king:{
      king:true,
      display:{
        w:"img/king-w.png",
        b:"img/king-b.png",
      },
      start: {
        w:[[0,3]],
        b:[[7,3]],
      },
      canMove:function(x1,y1,x2,y2){
        var destPiece = chess.getPieceAt(x2,y2);
        if(destPiece){
          if(destPiece.team == this.team){
            if (destPiece.id == 'rook' &&   !(chess.getPieceAt(x1,y1).hasMoved() || destPiece.hasMoved())){
              if ((y1< y2 && chess.isClearPath(x1,y1,x2,y2-1))||(y1> y2 && chess.isClearPath(x1,y1,x2,y2+1))) {
              return true;
              
              }
            }else{
              return false;
            }
          }
        }

        if(Math.abs(x1-x2) <= 1 && Math.abs(y1-y2) <= 1){
          return true;
        }
      }
    },
    queen:{
      display:{
        w:"img/queen-w.png",
        b:"img/queen-b.png",
      },
      start: {
        w:[[0,4]],
        b:[[7,4]],
      },
      canMove:function(x1,y1,x2,y2){
        if(chess.getPieceAt(x2,y2)){
          if(chess.getPieceAt(x2,y2).team == this.team){
            return false;
          }
        }

        if((Math.abs(x1-x2) == 0 || Math.abs(y1-y2) == 0) || (Math.abs(x1-x2) > 0 && Math.abs(y1-y2) > 0 && Math.abs(x1-x2) == Math.abs(y1-y2))){
          return chess.isClearPath(x1,y1,x2,y2);
        } else {
          return false;
        }
      }
    },
    bishop:{
      display:{
        w:"img/bishop-w.png",
        b:"img/bishop-b.png",
      },
      start: {
        w:[[0,5],[0,2]],
        b:[[7,5],[7,2]],
      },
      canMove:function(x1,y1,x2,y2){
        if(chess.getPieceAt(x2,y2)){
          if(chess.getPieceAt(x2,y2).team == this.team){
            return false;
          }
        }

        if(Math.abs(x1-x2) > 0 && Math.abs(y1-y2) > 0 && Math.abs(x1-x2) == Math.abs(y1-y2)){
          return chess.isClearPath(x1,y1,x2,y2);
        } else {
          return false;
        }
      }
    },
    rook:{
      display:{
        w:"img/rook-w.png",
        b:"img/rook-b.png",
      },
      start: {
        w:[[0,7],[0,0]],
        b:[[7,7],[7,0]],
      },
      canMove:function(x1,y1,x2,y2){
        if(chess.getPieceAt(x2,y2)){
          if(chess.getPieceAt(x2,y2).team == this.team){
            return false;
          }
        }

        if(Math.abs(x1-x2) == 0 || Math.abs(y1-y2) == 0){
          return chess.isClearPath(x1,y1,x2,y2);
        } else {
          return false;
        }
      }
    },
    knight:{
      display:{
        w:"img/knight-w.png",
        b:"img/knight-b.png",
      },
      start: {
        w:[[0,6],[0,1]],
        b:[[7,6],[7,1]],
      },
      canMove:function(x1,y1,x2,y2){
        if(chess.getPieceAt(x2,y2)){
          if(chess.getPieceAt(x2,y2).team == this.team){
            return false;
          }
        }

        if(Math.abs(x1-x2) == 1 && Math.abs(y1-y2) == 2){
          return true;
        } else if(Math.abs(x1-x2) == 2 && Math.abs(y1-y2) == 1){
          return true;
        } else {
          return false;
        }
      }
    },
  }
};
