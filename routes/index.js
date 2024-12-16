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


const { v4: uuidv4 } = require('uuid');

let games = [];

// Funkce pro validaci dat
function validateGameData(data) {
    const { name, difficulty, board } = data;
    if (!name || typeof name !== 'string') {
        return 'Invalid or missing game name';
    }
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return 'Invalid difficulty level';
    }
    if (!Array.isArray(board) || board.length !== 15 || !board.every(row => Array.isArray(row) && row.length === 15)) {
        return 'Invalid board format';
    }
    return null;
}

// Endpoint: Vytvoření nové hry
app.post('/api/v1/games', (req, res) => {
    const error = validateGameData(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    const newGame = {
        id: uuidv4(),
        name: req.body.name,
        difficulty: req.body.difficulty,
        board: req.body.board,
        createdAt: new Date().toISOString()
    };

    games.push(newGame);
    res.status(201).json(newGame);
});

// Endpoint: Získání všech her
app.get('/api/v1/games', (req, res) => {
    res.json(games);
});

// Endpoint: Získání konkrétní hry podle ID
app.get('/api/v1/games/:id', (req, res) => {
    const game = games.find(g => g.id === req.params.id);
    if (!game) {
        return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
});

// Endpoint: Smazání hry podle ID
app.delete('/api/v1/games/:id', (req, res) => {
    const gameIndex = games.findIndex(g => g.id === req.params.id);
    if (gameIndex === -1) {
        return res.status(404).json({ error: 'Game not found' });
    }
    games.splice(gameIndex, 1);
    res.status(204).send();
});