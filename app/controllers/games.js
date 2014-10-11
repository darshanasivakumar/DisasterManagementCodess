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
  }
  
};

exports.Games = Games;

