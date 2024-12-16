var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/api', function(req, res, next) {
  res.json({"organization": "Student Cyber Games"});
});






var app = router;

let games = [];

// Create a new game
app.post('/games', (req, res) => {
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

// Get all games
app.get('/games', (req, res) => {
    res.status(200).json(games);
});

// Get a game by UUID
app.get('/games/:uuid', (req, res) => {
    const game = games.find(g => g.uuid === req.params.uuid);
    if (!game) {
        return res.status(404).json({ code: 404, message: "Resource not found" });
    }
    res.status(200).json(game);
});

// Update a game by UUID
app.put('/games/:uuid', (req, res) => {
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

// Delete a game by UUID
app.delete('/games/:uuid', (req, res) => {
    const gameIndex = games.findIndex(g => g.uuid === req.params.uuid);

    if (gameIndex === -1) {
        return res.status(404).json({ code: 404, message: "Resource not found" });
    }

    games.splice(gameIndex, 1);
    res.status(204).send();
});