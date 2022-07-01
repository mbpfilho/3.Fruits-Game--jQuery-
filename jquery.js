var playing=false;
var score;
var trialsLeft;
var fruits=['apple','banana','cherries','grapes','mango','orange','peach','pear','pineapple','watermelon'];
var step;
var action; //for setInterval function

$(function(){    
$("#startreset").click(function(){ //click on start/reset button
//are we playing?
    if(playing==true){//yes
        location.reload(); //reload the page
    }
    //no
    else{
        playing=true;//game initiates
        score=0;//set score to 0
        $("#scorevalue").html(score);//show updated score
        $("#trialsleft").show(); //show trialsleft box
        trialsLeft=3;
        addHearts();
        $("#score").show();
        $("#gameover").hide();
        $("#startreset").html("Reset Game"); //change button text do "reset game"
        startAction();
    }

});

$("#fruit1").mouseover(function(){//slice a fruit
    score++;
    $("#scorevalue").html(score);//update score
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play(); //play slice sound    
    clearInterval(action);//stop moveing fruit
    $("#fruit1").hide("explode",300); //slice fruit
    setTimeout(startAction,300); //wait animation and send new fruit
});

    //play sound
    //explode fruit

//functions
function addHearts(){
    $("#trialsleft").empty();
    for(i=0;i<trialsLeft;i++){
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
};
function startAction(){//sends fruits
    //$("#fruitsContainer").append('<img src="images/apple.png" class="fruit">'); memory issues
    generateFruit();//generate a new fruit
    action=setInterval(function(){//2.move fruit down one step every every 3ms
        $("#fruit1").css('top',$("#fruit1").position().top+step);
        if($("#fruit1").position().top>$("#fruitsContainer").height()){ //is fruit too low?
            if(trialsLeft>1){
                generateFruit();//generate a new fruit
                trialsLeft--;//reduce trials by one
                addHearts();//update trialsLeft box
            }else{//no->show game over. 
                playing=false;//end of the game
                $("#startreset").html("Start Game");//button text back to start game
                $("#gameover").show();//show game over box
                $("#gameover").html('<p>Game Over!</p><p>Your score is '+score+'.</p>');//show game over message
                $("#trialsleft").hide();                
                $("#score").hide();  
                stopAction();
            };
        }; //no->repeat 2
    },3);
                   
                    //yes->any trial left?
                        //yes->repeat 1
                        
};
function chooseFruit(){ //generate a random fruit
    $("#fruit1").attr('src','images/'+fruits[Math.round(9*Math.random())]+'.png');
};
function generateFruit(){
    $("#fruit1").show(); //show fruit
    chooseFruit(); //1.create random fruit
    $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50});
    step=1+Math.round(2*Math.random());//define a random step
};
function stopAction(){//stop dropping fruits
    clearInterval(action);//stop moveing fruit
    $("#fruit1").hide();
};
});