var chess = null;

window.onload = function(){
  newGame();

  render();

  var hash = window.location.hash.substr(1);
  if(hash && chess){
    chess.import(sangwa.decode(hash));
    window.location.hash = "";
  }
}

function render(){
  if(chess){
    chess.render();
  }

  window.requestAnimationFrame(render);
}

function newGame(){
  var lastTouch = null;
  chess = new Chess('.chess',c);

  $('.chess')[0].onmousemove = function(e){
    chess.flyby(e.clientX - this.offsetLeft,e.clientY - this.offsetTop);
  }

  $('.chess')[0].onmousedown = function(e){
    chess.touchdown(e.clientX - this.offsetLeft,e.clientY - this.offsetTop);
  }

  $('.chess')[0].onmouseup = function(e){
    chess.takeoff(e.clientX - this.offsetLeft,e.clientY - this.offsetTop);
  }

  $('.chess')[0].addEventListener('touchstart', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    chess.touchdown(touch.pageX - this.offsetLeft,touch.pageY - this.offsetTop);
  }, false);

  $('.chess')[0].addEventListener('touchmove', function(e) {
    e.preventDefault();
    var touch = e.touches[0];
    chess.flyby(touch.pageX - this.offsetLeft,touch.pageY - this.offsetTop);
    lastTouch = touch;
  }, false);

  $('.chess')[0].addEventListener('touchend', function(e) {
    e.preventDefault();
    chess.takeoff(lastTouch.pageX - this.offsetLeft,lastTouch.pageY - this.offsetTop);
  }, false);

  chess.victory = function(team){
    $('.victory').show();
    if(team == "w"){
      $('.victory>.team').html('White');
    } else {
      $('.victory>.team').html('Brown');
    }
  }

  $('.victory').hide();
}

function importChess(){
  var data = prompt('Paste Game data here');

  if(data){
    chess.import(sangwa.decode(data));
  }
}

function exportChess(){
  prompt('Copy the data below',sangwa.encode(chess.export()));
}

function share(){
  prompt('Link is below',window.location.origin + window.location.pathname + "#" + sangwa.encode(chess.export()));
}
