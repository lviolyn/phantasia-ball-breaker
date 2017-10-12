var selection = new Audio("./music/selection.mp3");
var click = new Audio("./music/click.mp3");

var select = document.getElementsByClassName('btn-menu');

select[0].addEventListener('mouseover', function(){
    selection.currentTime = 0;
    selection.play();
}, false);

select[0].addEventListener("click", function(){
    click.currentTime = 0;
    click.play();
}, false);

select[1].addEventListener('mouseover', function(){
    selection.currentTime = 0;
    selection.play();
}, false);

select[1].addEventListener("click", function(){
    click.currentTime = 0;
    click.play();
}, false);

select[2].addEventListener('mouseover', function(){
    selection.currentTime = 0;
    selection.play();
}, false);

select[2].addEventListener("click", function(){
    click.currentTime = 0;
    click.play();
}, false);