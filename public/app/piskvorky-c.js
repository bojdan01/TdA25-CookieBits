const HraciPole = document.querySelector('#game-container');

HraciPole.addEventListener('click', (e) => {
    console.log(e.target.className);
    e.target.className = "game-x";
});