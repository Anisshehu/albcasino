let balance = 1000;
let symbols = ["🍒","💎","🔥","⭐","🎰"];
let deck = [];
let playerCards = [];
let dealerCards = [];

function updateBalance(){
document.getElementById("balance").innerHTML="Balance: €"+balance;
}

/* SLOT */
function spin(){
if(balance<50){alert("No money");return;}
balance-=50;
let result=symbols[Math.floor(Math.random()*symbols.length)];
document.getElementById("slot").innerHTML=result;

if(result==="💎"){balance+=300;alert("Jackpot +300");}
else if(result==="🔥"){balance+=150;alert("Win +150");}
updateBalance();
}

/* BLACKJACK */
function createDeck(){
let cards=[2,3,4,5,6,7,8,9,10,10,10,10,11];
deck=[];
for(let i=0;i<4;i++){deck=deck.concat(cards);}
}

function draw(){return deck.splice(Math.floor(Math.random()*deck.length),1)[0];}

function total(cards){
let t=cards.reduce((a,b)=>a+b,0);
while(t>21&&cards.includes(11)){
cards[cards.indexOf(11)]=1;
t=cards.reduce((a,b)=>a+b,0);
}
return t;
}

function startBlackjack(){
if(balance<100){alert("Need 100");return;}
balance-=100;
createDeck();
playerCards=[draw(),draw()];
dealerCards=[draw()];
updateBJ();
updateBalance();
}

function hit(){
playerCards.push(draw());
updateBJ();
if(total(playerCards)>21){alert("Bust");}
}

function stand(){
while(total(dealerCards)<17){dealerCards.push(draw());}
if(total(dealerCards)>21||total(playerCards)>total(dealerCards)){
balance+=200;alert("You win");
}else{alert("Dealer wins");}
updateBalance();
}

function updateBJ(){
document.getElementById("player").innerHTML="Player: "+playerCards+" ("+total(playerCards)+")";
document.getElementById("dealer").innerHTML="Dealer: "+dealerCards;
}

/* SOCCER */
let odds=1.8;
setInterval(()=>{
odds=(1.5+Math.random()).toFixed(2);
if(document.getElementById("odds"))
document.getElementById("odds").innerHTML="Odds: "+odds;
},3000);

function placeBet(){
if(balance<100){alert("No money");return;}
balance-=100;
if(Math.random()<0.5){
let win=100*odds;
balance+=parseInt(win);
alert("Won "+win);
}else{alert("Lost bet");}
updateBalance();
}

/* AUTH */
function login(){alert("Login success (Demo)");window.location="index.html";}
function register(){alert("Account created (Demo)");window.location="login.html";}

/* WITHDRAW */
function withdraw(){
let a=parseInt(document.getElementById("withdrawAmount").value);
if(a>balance){alert("Not enough");return;}
balance-=a;
alert("Withdraw requested (Demo)");
}
