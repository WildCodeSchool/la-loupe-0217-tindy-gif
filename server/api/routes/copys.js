import express from 'express';
import User from '../models/copy.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
        res.sendStatus(200);
    });

    var copy = new User();

    router.get('/', Auth.hasAuthorization, copy.findAll);

    router.get('/:id', Auth.hasAuthorization, copy.findById);

    router.post('/', Auth.hasAuthorization, copy.create);

    router.put('/',Auth.hasAuthorization, copy.copyUpdate);

    router.put('/:id', Auth.hasAuthorization, copy.update);

    router.delete('/:id', Auth.hasAuthorization, copy.delete);

    app.use('/copy', router);

};
