import express from 'express';
import { routes } from './routes/index.js';
import './db/database.js'

const app = express();
routes(app)
export { app }