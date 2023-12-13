import { Game } from '../../models/game/index.js';

export class GameService {
  async createGame(gameData) {
    console.log('Creating game',gameData);

    const game = new Game({
      name: gameData.name,
      url: gameData.url,
      author: gameData.author,
      publishedDate: new Date(),
    });

    await game.save();

    return game;
  }

  async getAllGame() {
    const games = await Game.find().lean();

    return games;
  }

  async getGameById(gameId) {
    const game = await Game.findById(gameId).lean();

    return game;
  }

  async updateGameById(gameId, updateObj) {
    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      {
        $set: updateObj,
      },
      { new: true }
    );

    if(!updatedGame) {
      throw new Error('Not Found.')
    }

    return updatedGame;
  }

  async deleteGameById(gameId) {
    const game = await Game.findOneAndDelete({ _id: gameId });

    if(!game) {
      throw new Error('Not Found.')
    }

    return {};
  }
}
