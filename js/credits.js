function show_data(id){
	//var y = document.getElementById("modal").innerHTML;
	var y = id;
	console.log(y);
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		//document.getElementById("demo").innerHTML = xhttp.responseText;
		var x = xhttp.responseText;
		
		var obj = JSON.parse(x);
		
		document.getElementById("nama").innerHTML = "";
		document.getElementById("nim").innerHTML = "";
		document.getElementById("job").innerHTML = "";
		document.getElementById("img").innerHTML = "";

		document.getElementById("img").innerHTML = "<img style='image-orientation: from-image;' class='rounded-circle img-responsive' src='"+obj[y].imageUrl+"'>"
		document.getElementById("nama").innerHTML = "<h5 id='nama'  class='mt-1 mb-2'>"+obj[y].name+"</h5>";
		document.getElementById("nim").innerHTML = "<h5 id='nama'  class='mt-1 mb-2'>"+obj[y].nim+"</h5>";
		document.getElementById("job").innerHTML = "<h5 id='nama'  class='mt-1 mb-2'>"+obj[y].job+"</h5>";
		
		console.log(obj[y]);
	}
	};
  
  xhttp.open("GET", "credits.json", true);
  xhttp.send();
}

var creditbgm = new Audio("./music/credits.mp3");

creditbgm.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
creditbgm.play();