import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
let isConnected;

const initDb = async () => {
  if (isConnected) {
    console.debug('Using existing database connection');
    return;
  }

  let db;
  try {
    const dbOptions = {
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    };

    db = await mongoose.connect(process.env.DB_URL, dbOptions);

    isConnected = db.connections[0].readyState;
    return;
  } catch (err) {
    isConnected = false;
    console.error('Error connecting to db', err);
    throw new Error('Error connecting to db');
  }
};

export { initDb };