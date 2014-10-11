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
  
  this.game = function (req, resp, params) {
    // get player
    
    // if there are no more turns left, end game
    
    // get a random action if there are turns left
    
    // render page with action
  }
  
  this.doAction = function (req, resp, params) {
    // calculate scoring here
  }
  
};

exports.Games = Games;

