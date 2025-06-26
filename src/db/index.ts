import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Post } from '../types';
import path from 'path';

interface DataSchema {
  posts: Post[];
}

const file = path.join(__dirname, '..', '..', 'db.json');
const adapter = new JSONFile<DataSchema>(file);
const db = new Low(adapter, { posts: [] });

db.read();

export default db;