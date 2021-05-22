import express from 'express';
import { sequelize } from './db.js';
import { userRouter } from './controllers/usercontroller.js';
import { gameRouter } from './controllers/gamecontroller.js';
import { authenticate } from './middleware/validate-session.js';

const app = express();

sequelize.sync();

app.use(express.json());
app.use('/api/auth', userRouter);
app.use('/api/game', authenticate, gameRouter);
app.listen(process.env.PORT, () => console.log('App is listening on 4000'));
