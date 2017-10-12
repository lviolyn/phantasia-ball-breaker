function initialize(){
    // ambil JSON dari localstorage
    var highscoreJSON = localStorage.getItem('pbb_highscore');
    // ubah JSON jadi array of object
    var highscore = JSON.parse(highscoreJSON);
    console.log(highscore);

    var table = document.getElementById('tblHS');

    // masukin ke tabel
    if (highscore != null) {
        for (var i=0; i<5; i++) {
            if (highscore.score[i] != null) {
                table.rows[i+1].cells[1].innerHTML = highscore.score[i].nama;
                table.rows[i+1].cells[2].innerHTML = highscore.score[i].point;
            }
        }
    }
}

// function setHighscore() {
//     var nama = document.getElementById('inputnama');
//     // ambil JSON dari localstorage
//     var highscoreJSON = localStorage.getItem('highscore');
//     // ubah JSON jadi array of object
//     var highscore = JSON.parse(highscoreJSON);
//     console.log(highscore);

//     var nama = document.getElementById('inputnama');
//     if (highscore == null) {
//         var json = {"score":[{"nama":nama.value,"point":score}]};
//         var newHighscore = JSON.stringify(json);
//         localStorage.setItem('highscore', newHighscore);
//     } else {
//         var newScore = highscore.score;
//         newScore.push({"nama":nama.value, "point":score});
//         newScore.sort(function(a, b) {
//             return a.point < b.point;
//         })
//         highscore.score = newScore;
//         localStorage.setItem('highscore', JSON.stringify(highscore));
//     }

//     window.location = './highscore1.html';
// }