import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_DATABASE.replace('<password>',import.meta.env.VITE_PASSWORD)


export const client = new MongoClient(uri);

export async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

