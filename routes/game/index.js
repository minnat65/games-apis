import express from 'express';

const router = express.Router();

import { GameService } from '../../service/game/index.js';

router.post('/games', (req, res) => {
  const gameData = req.body;
  const gameInstance = new GameService();

  res.sendPromise(gameInstance.createGame(gameData));
});

router.get('/games', (req, res) => {
  const gameInstance = new GameService();
  res.sendPromise(gameInstance.getAllGame())
});

router.get('/games/:gameId', (req, res) => {
  const { gameId } = req.params;
  const gameInstance = new GameService();

  res.sendPromise(gameInstance.getGameById(gameId));
});
router.patch('/games/:gameId', (req, res) => {
  const { gameId } = req.params;
  const toBeUpdatedData = req.body;
  const gameInstance = new GameService();

  res.sendPromise(gameInstance.updateGameById(gameId, toBeUpdatedData))
});
router.delete('/games/:gameId', (req, res) => {
  const { gameId } = req.params;
  const gameInstance = new GameService();

  res.sendPromise(gameInstance.deleteGameById(gameId));
});

export { router as gameRouter };