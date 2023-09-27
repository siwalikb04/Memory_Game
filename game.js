// alert("Test");
// $("h1").text("Hello");

    let started=false;

    
    let level=0;
    let buttonColors = ["red","blue","green","yellow"];
    let gamePattern = [];
    let userChosenPattern=[];
    function nextSequence(){
        userChosenPattern=[]; //to make sure user is re-choosing from start
        $("#level-title").html("<strong>Level</strong>: "+level);
        let randomNumber=Math.floor(Math.random()*4);
        let randomChosenColor=buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        buttonAnimation(randomChosenColor);
        playSound(randomChosenColor);
        level++;
        console.log(randomNumber);
        console.log(gamePattern);

    }

    
    $(document).keydown(()=>{
        if(!started){
            nextSequence();
            started=true;
        }
    });
    
    /*Another way:
        $(".btn").click((e)=>{
            let colorName-e.target.id;
            rest remains same
        })
    */

    // playSound can even be made into an anonymous function and will still work as usual

    $(".btn").click(function(){
        let colorName=this.id;
        playSound(colorName);
        userChoiceAnimate(colorName);
        userChosenPattern.push(colorName);
        /*checkInput(colorName);
        // in this way it'll only check for present input from the user
        */
       checkInput(userChosenPattern.length-1);
       console.log(userChosenPattern);
    }
    );

    function playSound(colorName) {
        switch (colorName) {
            case "red":
                new Audio("sounds/red.mp3").play();
                break;
            case "blue":
                new Audio("sounds/blue.mp3").play();
                break;
            case "yellow":
                new Audio("sounds/yellow.mp3").play();
                break;
            case "green":
                new Audio("sounds/green.mp3").play();
                break;
            default:
                break;
        }
    }

    function userChoiceAnimate(colorName) {
        $("#"+colorName).addClass("pressed");
        setTimeout(()=>{
            $("#"+colorName).removeClass("pressed");
        },50);
    }

    function buttonAnimation(colorName) {
        console.log(colorName+" From buttonAnimation");
        $("#"+colorName).fadeOut(100).fadeIn(100);
    }

    function checkInput(index) {
        if(userChosenPattern[index]===gamePattern[index]){
            console.log("Success");
            if(userChosenPattern.length===gamePattern.length)
                setTimeout(()=>{
                    nextSequence();
                },1000);
        }
        else{
            console.log("Wrong");  
            new Audio("sounds/wrong.mp3").play();
            $("body").addClass("game-over");
            setTimeout(()=>{
                $("body").removeClass("game-over");              
            },250);
            restartGame();
        }   
    }
    
    function restartGame() {
        started=false;
        gamePattern=[];
        level=0;
        $("#level-title").html("Game Over!🤖<br> Press any key to restart... 👽");
    }

    $(".help").on("click",()=>{
        window.location.href="help-me.html";
        /* We can also use
        window.open("help-me.html","_blank");
        */
    });



