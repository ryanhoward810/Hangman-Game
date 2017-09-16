document.addEventListener("DOMContentLoaded", function(){

    /* variables */

    var main = document.querySelector("main"),
        gameWord = document.querySelector("section:last-of-type p"),
        gameImg = document.querySelector("section:first-of-type img:first-of-type"),
        stickmanImg = document.querySelector("section:first-of-type img:last-of-type"),
        wrongLetters = document.querySelector("footer p"),
        guessPercentage = document.querySelector("aside footer h1:nth-of-type(1) span"),
        winPercentage = document.querySelector("aside footer h1:nth-of-type(2) span"),
        numGames = document.querySelector("aside footer h1:nth-of-type(3) span"),
        numWins = document.querySelector("aside footer h1:nth-of-type(4) span"),
        numLosses = document.querySelector("aside footer h1:nth-of-type(5) span"),
        goodGuessSound = document.querySelector("#goodGuess"),
        badGuessSound = document.querySelector("#badGuess"),
        winGame = document.querySelector("#winGame"),
        loseGame = document.querySelector("#loseGame"),
        guesses = [],
        wins = 0,
        losses = 0,
        rightGuesses = 0,
        totalGuesses = 0,
        stickman = [
            "assets/images/start.png",
            "assets/images/one.png",
            "assets/images/two.png",
            "assets/images/three.png",
            "assets/images/four.png",
            "assets/images/five.png",
            "assets/images/hanged.png"
        ],
        possibleWords = [
        {
            "word": "aztecs",
            "img": "desktop/assets/mascots/sdsu.jpg"
        },
        {
            "word": "bruins",
            "img": "desktop/assets/mascots/ucla.png"
        },
        {
            "word": "trojans",
            "img": "desktop/assets/mascots/usc.png"
        },
        {
            "word": "cardinal",
            "img": "desktop/assets/mascots/stanford.jpg"
        },
         {
            "word": "bears",
            "img": "desktop/assets/mascots/cal.jpg"
        },
         {
            "word": "bulldogs",
            "img": "desktop/assets/mascots/fresnostate.png"
        },
        ],
        currentGameWord;

    /* event handling */

    document.addEventListener("keyup", handleKeyup);


    /* game functions */

    function init(){
        //get random word
        currentGameWord = getRandomFromArray(possibleWords);
        //setup text and images
        totalGuesses += guesses.length;
        guesses = [];
        gameWord.textContent = updateWords(currentGameWord.word, guesses);
        gameImg.src = currentGameWord.img;
        updateWords(currentGameWord.word, guesses);
        setStickman();
        updateScores();
    }

    function updateScores(){
        if (totalGuesses + guesses.length === 0){
            guessPercentage.textContent = "0%";
        } else {
            guessPercentage.textContent = Math.round(100 * (rightGuesses/(totalGuesses+guesses.length))) + "%";
        }
        if (wins+losses === 0){
            winPercentage.textContent = "0%";
        } else {
            winPercentage.textContent = Math.round(100 * (wins/(wins+losses))) + "%";
        }
        numGames.textContent = wins+losses;
        numWins.textContent = wins;
        numLosses.textContent = losses;
    }

    function setStickman(){
        stickmanImg.src = stickman[wrongLetters.textContent.length];
    }

    function updateWords(word, guesses){
        //CORRECT OR INCORRECT GUESS?
        if (word.includes(guesses[guesses.length-1])){
            //correct guess
            rightGuesses++;
            goodGuessSound.play();
        } else {
            badGuessSound.play();
        }
        //CORRECT GUESSES
        var correct = ""; //this will hold the underscores and correct guesses
        //loop through each letter of word
        for (let i=0; i<word.length; i++){
            //get the current letter
            let letter = word[i];
            if (guesses.includes(letter)){
                //add letter to accumulator
                correct += letter;
            } else {
                //add an underscore to accumulator
                correct += "_";
            }
        }
        gameWord.textContent = correct;
        //INCORRECT GUESSES
        var incorrect = "";
        //loop through guesses
        for (let i=0; i<guesses.length; i++){
            //get the current letter
            let letter = guesses[i];
            if (!word.includes(letter)){
                incorrect += letter;
            }
        }
        wrongLetters.textContent = incorrect;
        //CHANGE STICKMAN
        setStickman();
        //END GAME?
        if (!correct.includes("_")){
            //win!
            wins++;
            main.classList.remove("gameon");
            updateScores()
            winGameSound.play();
        } else if (incorrect.length === 6){
            losses++;
            main.classList.remove("gameon");
            updateScores()
            endGameSound.play();
        }
        //UPDATE SCORES
        updateScores();
    }

    function handleKeyup(e){
        //start of game?
        if (!main.classList.contains("gameon")){
            main.classList.add("gameon");
            init();
            return;
        }
        //validate key input
        // --make sure key pressed is a-z
        if (e.keyCode < 65 || e.keyCode > 90){
            return;
        }
        // --make sure key's not already in guesses
        if (guesses.includes(e.key)){
            return;
        }
        //add the key pressed to the guesses array
        guesses.push(e.key);console.log(guesses);
        //update words
        updateWords(currentGameWord.word, guesses);
    }


    /* utilities */

    function getRandomFromArray(arr){
        //Math.random() produces random number between zero and one
        //Math.random() * 3 produces random number between zero and three
        //Math.floor() drops all decimals
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

});
