var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var userChose;
var started = false;
var level = 0;



function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play();
    $('#level-title').text("Level " + level);

    level++;

}


$(document).keypress(function (event) {
    if (!started) {
        nextSequence();
        console.log(started);
        started = true;
    }
});

$('.btn').click(function () {
    userChose = this.getAttribute('id');
    playSound(userChose);
    $('#' + userChose).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChose);  
    checkAnswer(userClickedPattern.length-1);
    // if(userClickedPattern.length!=gamePattern.length){
    //     checkAnswer(userClickedPattern.length-1);
    // }
   
    
    }
);


function checkAnswer(currentlevel){
    if(userClickedPattern[currentlevel]==gamePattern[currentlevel]){
        if(userClickedPattern.length==gamePattern.length){
            userClickedPattern=[];
            setTimeout(nextSequence,1000);
        }

    }else{
        playSound("wrong");
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');

        },200);
        $('h1').text("Game Over, press any key to restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
    
}