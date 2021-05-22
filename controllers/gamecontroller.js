import { Router } from 'express';
import Sequelize from 'sequelize';
import { GameModel } from '../models/game.js';
import { sequelize } from '../db.js';

export const gameRouter = Router();
const Game = GameModel(sequelize, Sequelize.DataTypes);

gameRouter.get('/all', (req, res) => {
  Game.findAll({ where: { owner_id: req.user.id } })
    .then((games) => {
      res.status(200).json({ games, message: 'Data fetched.' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Data not found' });
    });
});

gameRouter.get('/:id', (req, res) => {
  Game.findOne(
    {
      where: {
        id: req.params.id,
        owner_id: req.user.id,
      },
    },
  ).then((game) => {
    res.status(200).json({ game });
  }).catch((error) => {
    res.status(500).json({ message: 'Data not found.' });
  });
});

gameRouter.post('/create', (req, res) => {
  Game.create({
    title: req.body.game.title,
    owner_id: req.user.id,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played,
  }).then((game) => {
    res.status(200).json({ game, message: 'Game created.' });
  }).catch((error) => {
    res.status(500).json({ message: error.message });
  });
});

gameRouter.put('/update/:id', (req, res) => {
  Game.update({
    title: req.body.game.title,
    studio: req.body.game.studio,
    esrb_rating: req.body.game.esrb_rating,
    user_rating: req.body.game.user_rating,
    have_played: req.body.game.have_played,
  },
  {
    where: {
      id: req.params.id,
      owner_id: req.user.id,
    },
  }).then(() => {
    res.status(200).json({ gameId: req.params.id, message: 'Successfully updated.' });
  }).catch((error) => {
    res.status(500).json({ message: error.message });
  });
});

gameRouter.delete('/remove/:id', (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      owner_id: req.user.id,
    },
  }).then(() => {
    res.status(200).json({ gameId: req.params.id, message: 'Successfully deleted' });
  }).catch((error) => {
    res.status(500).json({ message: error.message });
  });
});
