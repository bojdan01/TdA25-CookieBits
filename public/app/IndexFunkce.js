function hrat() {
    const btnHrat = document.getElementById("game-bnt");
    const btnHrat2 = document.getElementById("game-bnt-2");
    const gameContainer = document.getElementById("game-container");
    const gameStart = document.getElementById("game-start");

    btnHrat.style.display = "none";
    btnHrat2.style.display = "none";
    gameStart.style.display = "";
    gameContainer.style.display = "none";
}
function novaHra() {
    const btnHrat = document.getElementById("game-bnt");
    const btnHrat2 = document.getElementById("game-bnt-2");
    const gameContainer = document.getElementById("game-container");
    const gameStart = document.getElementById("game-start");

    btnHrat2.style.display = "";
    gameContainer.style.display = "";
    gameStart.style.display = "none";
    btnHrat.style.display = "none";
}