const HraciPole = document.querySelector('#game-container');
let gameState = 'opening';
let Turn = true;

HraciPole.addEventListener('click', (e) => {

    if (e.target.className == '') {
        if (Turn == true) {
            e.target.className = "game-x";
            Turn = false;
        } else {
            e.target.className = "game-o";
            Turn = true;
        }

    }

});