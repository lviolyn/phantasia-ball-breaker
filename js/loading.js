// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }

function loading(percent){
  //let persen = document.getElementById("load").innerHTML;
  //console.log(percent);
  let full = false;
  setTimeout(function(){
  	document.getElementById("load").innerHTML = percent + "%";	
  	let addPercent = Math.floor(Math.random()*20);
  	
    if(percent+addPercent < 100) loading(percent+addPercent);
  	else{
  		percent = 100;
  		document.getElementById("load").innerHTML = "100%";
      full = true;
  		// document.getElementById("load").innerHTML = "<a href='game.html'><img src='images/btn-start.png'><a>";
 	  }
    if(full){
      window.location.href="game.html";
    }
  },700);
}