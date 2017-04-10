import express from 'express';
import Gif from '../models/gif.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var gif = new Gif();

    router.get('/all', gif.findAll);

    router.get('/vote', gif.findUser);

    router.get('/gif', gif.findById);

    router.get('/one/:id', gif.findOne);

    router.post('/', gif.create);

    router.put('/like/:id', gif.likeUpdate);

    router.put('/dislike/:id', gif.dislikeUpdate);

    router.delete('/:id', gif.delete);

    app.use('/gifs', router);

};
