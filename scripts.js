$(document).ready(function () {
    roundNumber = 1;
    $nextButton = $('#next');
    money = 0;
    roundLoss = 1400*5;
    roundWin = 3250*5;
    enemyMoney = $('#enemyMoney');
    buy = "full";
    fullBuy = 25000;
    halfBuy = 10000;
    consecutiveLosses = 0;
    savedGuns = 0;
    kills = 0;
    savedMoneyPerGun = 4000;
    $prediction = $('#prediction');
    $predictionHeader = $('#prediction h2');
    $predictionParagraph = $('#prediction p');
    didTheyWin = true;
    
    function moneyLimits(){
        if (money > 80000){
            money = 80000;
        } else if (money < 0) {
            money = 0;
        }
    }
    
    function calculateLossBonus(){
        if (consecutiveLosses === 0 || consecutiveLosses === 1){
            roundLoss = 1400*5;
        } else if (consecutiveLosses === 2){
            roundLoss = 1900 * 5;
        } else if (consecutiveLosses === 3 ){
            roundLoss = 2400 * 5;
        } else if (consecutiveLosses === 4){
            roundLoss = 2900 * 5;
        } else {
            roundLoss = 3500 * 5;
        }
    }
    

    $("#roundnumber").html(roundNumber);
    // UPDATES ROUND AND MONEY
    function nextRound() {
        roundNumber++;
        calculateLossBonus()
       // moneyLimits();
        $(enemyMoney).html('$'+money);
        $("#roundnumber").html(roundNumber);
        predict();
        
    }
    
    // SETS MONEY TO NEW VALUE
    $('#nextWin').on('click', function(){
        money -= fullBuy;
        moneyLimits();
        money += roundWin;
        consecutiveLosses = 0;
        money += savedGuns * 4000;
        money += kills * 300;
        moneyLimits();
        didTheyWin = true;
        nextRound();
    });
    $('#nextLose').on('click', function(){
        consecutiveLosses++;
        calculateLossBonus();
        switch (buy) {
            case "full":
                money -= fullBuy;
                moneyLimits();
                money += roundLoss;
                break;
            case "half":
                money -= halfBuy;
                moneyLimits();
                money += roundLoss;
                break;
            case "force":
                money = 0;
                money += roundLoss;
                break;
            case "eco":
                money += roundLoss;
                break;
                  };
        moneyLimits();
        money += savedGuns * 4000;
        money += kills * 300;
        moneyLimits();
        didTheyWin = false;
        nextRound();
    });
    
    
    //Event Listerners
    $('#enemybuy input').on('change', function() {
        buy = $('input[name=whatDidTheyBuy]:checked', '#enemybuy').val();
    });
    
    $('#saveGuns input').on('change', function() {
        savedGuns = parseInt($('input[name=howManySaved]:checked', '#saveGuns').val());
    });
    
     $('#kills input').on('change', function() {
        kills = parseInt($('input[name=howManyKills]:checked', '#kills').val());
    });
    
    
    
    
    
    //MAKE THE PREDICTION
    function predict(){
        if (roundNumber === 1) {
            $predictionHeader.html("Prediction: Pistol Round!");
            $predictionParagraph.html("This is a pistol round, so not much else to say!");
        } else if (money >= 7000 && money <= 9000) {
            $predictionHeader.html("Prediction: Force Buy!");
            $predictionParagraph.html("They won't have enough to full buy next round if they eco, so it makes sense for them to force buy this round.");
        } else if (money <= 10000 && consecutiveLosses === 2) {
            $predictionHeader.html("Prediction: Full Eco");
            $predictionParagraph.html("If they save their money this round, they can full buy next. So expect a full eco. But they could force again, so gain information first. Either way, expect an aggressive play.");
        } else if (money <= 14000 && consecutiveLosses === 1){
            $predictionHeader.html("Prediction: Force Buy or Half Buy");
            $predictionParagraph.html("If they eco this, they still won't have enough for a complete full buy next. But they can do a big force and then only eco once before a full buy. Or alternatively they could half buy. Either way, expect low firepower and low utility.");
        } else if (money >= 15000 && money <= 20000 && calculateLossBonus <= 2) {
            $predictionHeader.html("Prediction: Full Eco or Half Buy");
            $predictionParagraph.html("This depends mostly on their loss bonus. They could force, but if they have rounds to play with, then it would be much wiser to full eco or half buy this round so they can get a full buy next round");
        } else if (money <= 18000 && consecutiveLosses >= 3) {
            $predictionHeader.html("Prediction: Half Buy");
            $predictionParagraph.html("They don't have enough for a full buy, and if they game isn't about to end, then half buying this round and full buying the next round makes the most sense. Expect pistols, armour and a bit of utility.");
        } else if (money >= 20000 && money <= 24000 && didTheyWin === false) {
            $predictionHeader.html("Prediction: Full Buy");
            $predictionParagraph.html("They have enough to pull off a full buy.");
        } else if (money > 24000 && didTheyWin === false) {
            $predictionHeader.html("Prediction: Full Buy");
            $predictionParagraph.html("They're loaded. Expect the fullest of full buys!");
        } else if (money > 22000 && didTheyWin === true) {
            $predictionHeader.html("Prediction: Full Buy");
            $predictionParagraph.html("They won the last round and they have lots of money. Expect a full buy!");
        } else if (money < 20000 && didTheyWin === true) {
            $predictionHeader.html("Prediction: Full Buy");
            $predictionParagraph.html("They won the round, but they're not exactly rich. They will buy, but likely be stuck on rifles with no utility, or SMGs");
        } else if (didTheyWin === true) {
            $predictionHeader.html("Prediction: Full Buy");
            $predictionParagraph.html("They won the last round, so they'll be buying everything they can afford.");
        } else if (money <= 11000){
            $predictionHeader.html("Prediction: Force Buy!");
            $predictionParagraph.html("Either a force, or a full eco. But since you cannot gamble on the full eco, plan for them to force and expect an aggressive strat.");
        } else if (money > 11000 && money < 20000){
            $predictionHeader.html("Prediction: Eco or Half Buy");
            $predictionParagraph.html("Depending on thier loss bonus, they should either eco or half buy. If a low loss bonus, they can eco this and buy next. If a high loss bonus, they can spend a small bit of money on pistols, armour and utility, and still buy next. So get the information, and play accordingly!");
        } else {
            $predictionHeader.html("Prediction: No Prediction");
            $predictionParagraph.html("I am sorry but I don't have a prediction for this. If you can think of one, please email me @ email!");
        }
    }
    
    predict();
    
    
    //$predictionHeader.html("test");
    //$predictionParagraph.html("test");
    
    $('#popup').hide();
    
    $('#info').on('click', function (){
        $('#popup').slideToggle();
    })
    
    $('#popup #close').on('click', function (){
        $('#popup').slideToggle();
    })
    
});