var bgmtitle = new Audio("./music/bgmtitle.mp3");

bgmtitle.addEventListener('ended', function(){
    bgmtitle.currentTime = 0;
    bgmtitle.play();
}, false);

bgmtitle.play();