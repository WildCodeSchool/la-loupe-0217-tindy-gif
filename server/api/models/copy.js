import mongoose from 'mongoose';
import moment from 'moment';
import token from '../token.js';
import User from './user.js';




const copySchema = new mongoose.Schema({


    gifId: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    url: {
        type: String
    },
    urlSmall: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }



});



let model = mongoose.model('Copy', copySchema);

export default class Copy {

    create(req, res) {
        model.create(req.body,
            (err, copy) => {
                if (err) {
                    res.status('nope').send(err.message);
                } else {
                    res.json(copy);
                }
            });
    }


    findAll(req, res) {
        model.find({}, {

        }, (err, copys) => {
            if (err || !copys) {
                res.sendStatus(403);
            } else {

                res.json(copys);
            }
        });
    }

    findById(req, res) {
        model.find({user:req.params.id},(err, copy) => {
            if (err || !copy) {
                res.sendStatus(403);
            } else {

              var newCopy = [];
              var copys = copy;
              
              for (var i = 0; i < copys.length; i++) {
                  if (newCopy.map((obj) => obj.gifId).includes(copys[i].gifId)) {
                      newCopy[newCopy.map((obj) => obj.gifId).indexOf(copys[i].gifId)].count++;
                      if (moment(copys[i].date).isAfter(newCopy[newCopy.map((obj) => obj.gifId).indexOf(copys[i].gifId)].date)) {
                          newCopy[newCopy.map((obj) => obj.gifId).indexOf(copys[i].gifId)].date = copys[i].date;
                      }
                  } else {
                      newCopy.push({
                          gifId: copys[i].gifId,
                          count: 1,
                          url:copys[i].url,
                          urlSmall: copys[i].urlSmall,
                          date: copys[i].date
                      });
                  }
              }


                res.json(newCopy);
            }
        });
    }


    update(req, res) {
        model.update({
            _id: req.params.id
        }, req.body, (err, copy) => {
            if (err || !copy) {
                res.status(500).send(err.message);
            } else {
                let tk = jsonwebtoken.sign(user, token, {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    copy: copy,
                    token: tk
                });
            }
        });
    }
    copyUpdate(req, res) {
        console.log("haha", req.query.gif);
        model.findByIdAndUpdate({
            _id: req.params.id,
        }, req.body, (err, copy) => {
            if (err || !copy) {
                res.status('nop').send(err.message);
            } else {

                res.json(copy);
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
