import mongoose from 'mongoose';
import User from './user.js';

function compare(a, b) {
  if (a.vote < b.vote)
    return 1;
  if (a.vote > b.vote)
    return -1;
  return 0;
}

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const gifSchema = new mongoose.Schema({

  gif: {
    type: String,
  },
  url: {
    type: String
  },
  urlSmall: {
    type: String
  },
  like: [likeSchema],
  dislike: [likeSchema]
});


let model = mongoose.model('Gif', gifSchema);


export default class Gif {

  findAll(req, res) {
    model.find({}, (err, gifs) => {
      if (err || !gifs) {
        res.send('Nope!');
      } else {
        var rank = [];
        var table = gifs;
        for (var i = 0; i < table.length; i++) {
          var calc = {
            gif: table[i].gif,
            url: table[i].url,
            urlSmall: table[i].urlSmall,
            vote: table[i].like.length - table[i].dislike.length,
            like: table[i].like.length,
            dislike: table[i].dislike.length,
            class: 0
          };
          rank.push(calc);
          rank.sort(compare);
        }
        res.json(rank);
      }
    });
  }
  findUser(req, res) {
    model.findOne({
      gif: req.query.gif
    }, (err, gif) => {
      if (err || !gif) {
        res.status(404);
      } else {
        res.json(
          gif.like.some(user => user.user == req.query.user) || gif.dislike.some(user => user.user == req.query.user)
        );
      }
    });
  }

  findById(req, res) {
    model.findOneAndUpdate({
      gif: req.query.gif,
      url: req.query.url,
      urlSmall: req.query.urlSmall
    }, {
      gif: req.query.gif,
      url: req.query.url,
      urlSmall: req.query.urlSmall,
      like: [],
      dislike: []
    }, {
      upsert: true
    }, (err, gif) => {
      if (err || !gif) {
        res.send(gif);
      } else {
        res.json(gif);
      }
    });
  }

  findOne(req, res) {

    model.findOne({
        gif: req.params.id
      },
      (err, gif) => {
        if (err || !gif) {
          res.status('nop');
        } else {
          res.json(gif);
        }
      });
  }

  create(req, res) {
    model.create(req.body,
      (err, gif) => {
        if (err || !gif) {
          res.status(500).send(err.message);
        } else {
          res.json(gif);
        }
      });
  }

  likeUpdate(req, res) {
    model.findOneAndUpdate({
      gif: req.params.id
    }, {
      $push: {
        like: {
          user: req.body.user
        }
      }
    }, (err, gif) => {

      if (err || !gif) {
        res.status("nope").send(err.message);
      } else {
        res.json(gif);
      }
    });
  }

  dislikeUpdate(req, res) {
    model.findOneAndUpdate({
      gif: req.params.id
    }, {
      $push: {
        dislike: {
          user: req.body.user
        }
      }
    }, (err, gif) => {
      if (err || !gif) {
        res.status("nope").send(err.message);
      } else {
        res.json(gif);
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
