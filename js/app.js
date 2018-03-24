

//Global variables
var card=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf","fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane-o","fa-cube"]
var deck=$(".deck");
var cards=$(".card");
var second=0;
var timeStart;
var cardsFlipp;
var moves=0;
var $moves=$(".moves");
var matchCard=0;
var CardOpened=[];
var rating;
var score

function shuffleCard(){  //we will shuffled cards and added to page

	var newCard =shuffle(card); // we take suffle function and do it with array cards
	deck.empty() //We will empty the contents of the deck.
	for(var i=0;i<newCard.length;i++){//make loops for newCard and added to deck 
		deck.append($('<li class="card"><i class="fa ' + newCard[i] + '"></i></li>'))

		}

	$(".card").addClass("show")//we added class show for card class to see all cards before Game start 
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
    };
    

 
function startGame(){ //this function start the game
	
	
	shuffleCard()// first we will call shuffleCard function 
	moves=0 //here We will reset the value of moves 
	$moves.text("0") //added to page 
	$(".container").prepend("<button>start</button>") //we added start button to the page 
	$("button").css({"font-size":"30px","color":"blue"}) // we will make style for start
	$("button").click(function(){ //when player press on start button
		$(this).hide() // start button will be hide 
		$(".card").removeClass("show","open","match") //we will remove classes (show,open, and match)
		timer() // we will call timer function to start the time 
		
})
}		

function timer(){
		$(".score-panel").append("<span id='time'></span>") //we will add HTML for time in the score panel
		var time=$("#time");
		time.css({"color":"blue","padding-left":"40px"}); //we will make style for time in the page
		timeWalk() //we will call timeWalk function
		restart()	//if game start so the player can do restart for the game (we will call restart function)			
	}

function timeWalk(){//This function for time run 
	/*I added variable called second I gave it 0 ,so we will use setInterval function to call this function after 1 second 
	so the second variable will change after 1 second >>it will be timer */
 	  timeStart= setInterval(function(){ 
			$("#time").text(second) //we will add second in the page.
			second=second+1
		}, 1000)

 	  flipCards() // if time run we can call function flipCards
		}

//this function will stop the timer(we will call it when game finished)
function timeStop(){
	clearInterval(timeStart)
	winGame() //here we call function (winGame)
};
	
	//this function will filped cards 
	function flipCards(){
		$(".card").on("click",function(){  //here we added event for class card
		var thisEle=$(this);
		if(thisEle.hasClass("show")||thisEle.hasClass("match")){return true;}//here player cannot press or choose on card has class show or match
		
		var cardThis=thisEle.html();//here we will add selected card html elements to variable.
		thisEle.addClass("open show");//we will add class open and show when player press on the card
		CardOpened.push(cardThis);// we added cardThis to variable called cardOpend to compare with second card plyer choose
		if(CardOpened.length>1){//here we will check if plyer press on the first card(if he press it will save in the cardOpend variable)
			if(cardThis===CardOpened[0]){ //here we will compare between first card and second card(if are equals will do some operations)
				
				setTimeout(function(){ //we will use setTimeout function to do function and make delay for this function
						$(".open").addClass("match");// here we add class match to open class to tell the player his answer is true  
						$(".match").removeClass("open show");},500);//remove class open and show after delay time (500 Millisecond)
						matchCard+=1; //if cards matches will will add 1 to variable matchCard.
			}
			else{ // if player choose is wrong we will fliped cards to hide side
				
				setTimeout(function(){
					$(".open").removeClass("open match show");},500);//this function make dealy after (500 Millisecond)

					

			}
			CardOpened=[]; //We will empty the contents of the variable, We give the player chance to choose differents cards,and copare between it.
			moves+=1 //we will add 1 to moves
			$moves.html(moves)//we will show number of moves in the page .
			ratingBymoves(); //This function for rating it's depend on moves number 
			}
			if(matchCard===8){ //if all cards are matched 
				score=rating; //
				timeStop();} //will stop timer 

			
})
	}
		
			
function restart(){ //This function for restart
	$(".restart").click(function(){ //if will clicked on restart class in the page ,the page will reload 
		location.reload();

	});
		
}

	function ratingBymoves(){ //this function for rating by number of moves
		
		if(moves<10){// if player moves >5 and <10 
			
			rating=3; //rating will be 3
		}
		else if(moves>=10&&moves<20){// if player moves >=10 and <20
			$(".stars").find("i").eq(0).removeClass("fa-star") //we will remove 1 star from first (i in class stars) if player moves  bigger than or equale 10 and smaller than 20
			rating=2; //rating will be 1
		}
		else if(moves>=20){//if player moves bigger than or equals 20
			$(".stars").find("i").eq(1).removeClass("fa-star");//we will remove 1 star from seconde (i in class stars) if player moves bigger than or equals 20
			rating=1;
		}
	}
function winGame(){//this function will show the Player message when he win
	swal({//the is sweet alert we use it to show message 
		title:"good job! you won!", //this title for alert
		text:"you make "+moves+" moves and you have "+score+" stars "+" your time is "+second+" second ", //this text we want show it for Player
		icon:"success",	//this icon for alert
		button:{text:"play again?"} //this button will reload the game when player press on it
	}).then(function(isConfirm){
		if(isConfirm){
			location.reload();
		}
	});

}



	
	 

	
	startGame();






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
