var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api', function (req, res, next) {
    res.json({ "organization": "Student Cyber Games" });
});


const { v4: uuidv4 } = require('uuid');
let games = [];

// Vytvoří novou hru
router.post('/api/v1/games', (req, res) => {
    const { name, difficulty, board } = req.body;
    if (!name || !difficulty || !Array.isArray(board) || board.length !== 15 || board.some(row => !Array.isArray(row) || row.length !== 15)) {
        return res.status(400).json({ code: 400, message: "Bad request: Missing or invalid fields" });
    }

    const newGame = {
        uuid: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
        difficulty,
        gameState: 'opening',
        board
    };

    games.push(newGame);
    res.status(201).json(newGame);
});

// Zobrazí všechny hry
router.get('/api/v1/games', (req, res) => {
    res.status(200).json(games);
});

// Získává hru pomocí uuid
router.get('/api/v1/games/:uuid', (req, res) => {
    const game = games.find(g => g.uuid === req.params.uuid);
    if (!game) {
        return res.status(404).json({ code: 404, message: "Resource not found" });
    }
    res.status(200).json(game);
});

// Aktualizuje hru pomocí uuid
router.put('/api/v1/games/:uuid', (req, res) => {
    const { name, difficulty, board } = req.body;
    const gameIndex = games.findIndex(g => g.uuid === req.params.uuid);

    if (gameIndex === -1) {
        return res.status(404).json({ code: 404, message: "Resource not found" });
    }

    if (!name || !difficulty || !Array.isArray(board) || board.length !== 15 || board.some(row => !Array.isArray(row) || row.length !== 15)) {
        return res.status(400).json({ code: 400, message: "Bad request: Missing or invalid fields" });
    }

    const updatedGame = {
        ...games[gameIndex],
        name,
        difficulty,
        board,
        updatedAt: new Date()
    };

    games[gameIndex] = updatedGame;
    res.status(200).json(updatedGame);
});

// Maže hru pomocí uuid
router.delete('/api/v1/games/:uuid', (req, res) => {
    const gameIndex = games.findIndex(g => g.uuid === req.params.uuid);

    if (gameIndex === -1) {
        return res.status(404).json({ code: 404, message: "Resource not found" });
    }

    games.splice(gameIndex, 1);
    res.status(204).send();
});


// tohle mozná smazat

/* 
Zde se načítají hry /game

a u /game/:uuid uuid je uuid hry
*/
// router.get('/game', (req, res) => {
// res.setHeader('Content-Type', 'text/html');
// res.status(200).send('<html><body><h1>Game Page</h1><p>Welcome to the game page!</p></body></html>');
// });

// router.get('/game/:uuid', (req, res) => {
// const game = games.find(g => g.uuid === req.params.uuid);
// if (!game) {
//     return res.status(404).send('<html><body><h1>404 Not Found</h1><p>Game not found.</p></body></html>');
// }

// res.setHeader('Content-Type', 'text/html');
// res.status(200).send(`<html><body><h1>Game: ${game.name}</h1><p>Difficulty: ${game.difficulty}</p></body></html>`);
// });

module.exports = router;