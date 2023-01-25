var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// detecting Keyboard Press
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
    }
});


// detecting clicks
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
});


// Checking the user Clicked Sequence.
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);

            if(userClickedPattern.length === 10)
            {
                $("body").addClass("rock-star");
                $("h1").text("You are Rockstar!")
                // Removing class Game over and changing the title 
                setTimeout(function(){
                $("body").removeClass("rock-star");   
                },500);
            }
          }
    
        } else {
            
            // Adding class for Game over with Wrong sound
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");

            // Removing class Game over and changing the title 
            setTimeout(function(){
            $("body").removeClass("game-over");   
            },200);

            console.log("Wrong");
            startOver();    

        }
}



// Genrating a Sequence
function nextSequence(){
    userClickedPattern = [];
    level++
    $("#level-title").text("Level "+level)
    // Genrating a Random Number from 0 - 3 and Creating a sequence and pushing it to gamePatten
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Play sound function

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


// Animating function 
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
  
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");   
       },100)
}


// Reset the game
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];

}