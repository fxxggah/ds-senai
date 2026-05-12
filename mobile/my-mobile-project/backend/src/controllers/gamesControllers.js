const db = require('../config/db');

const validStatus = ['Wishlist', 'Playing', 'Completed', 'Dropped'];
const validClassification = ['Livre', '10', '12', '14', '16', '18'];

const getGames = (req, res) => {
  const sql = 'SELECT * FROM game_library WHERE active = true';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

const createGame = (req, res) => {
  const {
    title,
    genre,
    classification,
    platform,
    game_status,
    release_date,
    developer
  } = req.body;

  if (
    !title ||
    !genre ||
    !classification ||
    !platform ||
    !game_status ||
    !release_date ||
    !developer
  ) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  if (!validStatus.includes(game_status)) {
    return res.status(400).json({
      message: 'Invalid game status'
    });
  }

  if (!validClassification.includes(classification)) {
    return res.status(400).json({
      message: 'Invalid classification'
    });
  }

  const sql = `
    INSERT INTO game_library
    (title, genre, classification, platform, game_status, release_date, developer)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    genre,
    classification,
    platform,
    game_status,
    release_date,
    developer
  ];

  db.query(sql, values, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json({
      message: 'Game created successfully'
    });
  });
};

const updateGame = (req, res) => {
  const { id } = req.params;

  const {
    title,
    genre,
    classification,
    platform,
    game_status,
    release_date,
    developer
  } = req.body;

  const sql = `
    UPDATE game_library
    SET
      title = ?,
      genre = ?,
      classification = ?,
      platform = ?,
      game_status = ?,
      release_date = ?,
      developer = ?
    WHERE id = ?
  `;

  const values = [
    title,
    genre,
    classification,
    platform,
    game_status,
    release_date,
    developer,
    id
  ];

  db.query(sql, values, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json({
      message: 'Game updated successfully'
    });
  });
};

module.exports = {
  getGames,
  createGame,
  updateGame
};