const express = require('express');
const router = express.Router();

const {
  getGames,
  createGame,
  updateGame
} = require('../controllers/gamesControllers');

router.get('/', getGames);
router.post('/', createGame);
router.put('/:id', updateGame);

module.exports = router;