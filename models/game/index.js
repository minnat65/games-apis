import { Schema, model } from "mongoose";

const gameSchema = new Schema({
  name: { type: String, trim: true },
  url: { type: String, trim: true },
  author: { type: String, trim: true },
  publishedDate: { type: Date },
});

const Game = model('Game', gameSchema);

export { Game };