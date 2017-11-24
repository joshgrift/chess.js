/* configs */
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
        return true;
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
        return true;
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
        return true;
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
        return true;
      }
    },
    castle:{
      display:{
        w:"img/castle-w.png",
        b:"img/castle-b.png",
      },
      start: {
        w:[[0,7],[0,0]],
        b:[[7,7],[7,0]],
      },
      canMove:function(x1,y1,x2,y2){
        return true;
      }
    },
    rook:{
      display:{
        w:"img/rook-w.png",
        b:"img/rook-b.png",
      },
      start: {
        w:[[0,6],[0,1]],
        b:[[7,6],[7,1]],
      },
      canMove:function(x1,y1,x2,y2){
        return true;
      }
    },
  }
};
