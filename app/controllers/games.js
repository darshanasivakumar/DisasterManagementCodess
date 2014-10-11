var Games = function () {

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    this.respond({params: params});
  };
  
  this.start = function (req, resp, params) {
    // create a player
    var player = geddy.model.Player.create({
      name: req.playerName
    , jobClass: req.jobClass
    }).save();
    self.session.set('playerId', player.id);
    // create a round
    var round = geddy.model.Round.create({
      status: 'active'
    }).save();
    // create a round_player
    var roundPlayer = geddy.model.RoundPlayer.create({
      round: round.id
    , player: player.id
    , turns: geddy.config.numberOfTurns
    , score: 0
    });
    
    this.redirect({controller: this.name, action: 'game'});
  }
  
  this.play = function (req, resp, params) {
    var self = this;
    
    // get player
    geddy.model.Player.first(self.session.get('playerId'), function (err, player) {
      if (err) throw geddy.errors.InternalServerError();
      
      if (!player) {
        self.redirect({controller: self.name, action: 'index'});
      } else {
        geddy.model.RoundPlayer.first({player: player.id}, function (err, roundPlayer) {
          if (roundPlayer.turns > 0) {
            // get random action
            var randomAction = geddy.actionPool[Math.floor(Math.random()*geddy.actionPool.length)];
            self.respond({randomAction: randomAction});
          } else {
            // end game
            self.redirect({controller: self.name, action: 'index'});
          }
        });
      }
    });
  }
  
  this.doAction = function (req, resp, params) {
    // calculate scoring here
  }
  
};

exports.Games = Games;

