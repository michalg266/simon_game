var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var newGame = true;
var level = 0;
var maxLevel = 0;
$("button").prop("disabled",true);

function nextSequence() {
    var nahodneCislo = (Math.random()*4);
    nahodneCislo = Math.floor(nahodneCislo);

    var randomChosenColor = buttonColors[nahodneCislo];
    gamePattern.push(randomChosenColor);
    
    $("button").prop("disabled", true);     
    for (let i=0; i<gamePattern.length; i++) {

    setTimeout(function() {
        let currentColor = gamePattern[i];
        $("#" + currentColor).addClass("pressed");
        console.log('"#" + gamePattern[i]:  ' + "." + currentColor);
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, 150);
        playSound(currentColor);
        setTimeout(function(){}, 150);
    }, i*300);
 };
    level++;
    setTimeout(function() {
        $("button").prop("disabled", false);
    }, 300*gamePattern.length);
    
    userClickedPattern = [];  // vynulovanie inputu hraca
}

$(".btn").click(animateClick);  // user input cize klikanie na mysou na buttons

function animateClick(event) {
    this.blur();
    userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function() {
        $("#" + userChosenColor).removeClass("pressed");
    }, 100);   
    playSound(userChosenColor);
    var patternLength = userClickedPattern.length;  //taktiez aktualny level
    checkAnswer(patternLength);
}

function playSound(name) {
    var zvuk = new Audio("./sounds/" + name + ".mp3");
    zvuk.play()
}

$("h1").click(function(event) {
    if (newGame === true) {
        resetGame();
        $("h1").text("Level " + (level + 1));
        setTimeout(nextSequence, 250);
    }
    else {
        console.log("Uz nefunguje, hra uz bezi.")
    }
    newGame = false;
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel-1] === gamePattern[currentLevel-1]) {
        colorCheck("right");
        if (userClickedPattern.length === gamePattern.length) {
            console.log("koniec levelu, malo by prist vyhodnotenie a nove tlacidlo")
            $("h1").text("Level UP!");
            console.log("currentLevel: " + currentLevel);
            bestScore(currentLevel);
            setTimeout(function() {
                $("h1").text("Level " + (level + 1));
            }, 500);

            setTimeout(nextSequence, 700);

        }
    }
    else {
         colorCheck("wrong");
         $("h1").text("Game over! Level reched: " + (level-1));
         $("button").prop("disabled", true);
         setTimeout(function() {
            $("h1").text("Restart");
         }, 1500);
         newGame = true;
    }
}

function colorCheck(right_or_wrong) {
    if (right_or_wrong === "right") {
    }
    else if (right_or_wrong === "wrong") {
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 1500);
    }
}

function resetGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("button").prop("disabled", false);
}

function bestScore(level) {
    if (level > maxLevel) {
        maxLevel = level;
        $(".results").text("Best score: " + maxLevel);
        console.log("---- som tu -----");
    }
}



