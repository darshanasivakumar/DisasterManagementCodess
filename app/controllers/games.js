var Games = function () {

  // Initialize Action Pool

  var actionPool = [];
  
  var action = geddy.model.Action.create({
    name: 'HurricaneKatrina'
	, story: 'One of the 5 deadliest hurricanes in the US so far.  ~1833 lives affected.  '
	, image: ''
	, jobClass: ''
	, goodAnswer: ''
	, badAnswer: ''
  , jobClass: 'rescueOperator'
    });
	action.save();
	actionPool.push(action.Id);
	
	var action1 = geddy.model.Action.create({
	 name: 'FoodDistribution'
	 , story: '100 families in need of food supplies 10 meters from you'
	 , image: ''
	 , jobClass: ''
	 , goodAnswer: ''
	 , badAnswer: ''
	 });
	 action1.save();
	 actionPool.push(action1.Id);
	 
	 var action2 = geddy.model.Action.create({
	  name: 'MedicalHelp'
	  , story: '~200 people need first aid in a nearby shelter'
	  , image: ''
	  , jobClass: ''
	  , goodAnswer: ''
	  , badAnswer: ''
	 });
	 action2.save();
	 actionPool.push(action2.Id);

  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    this.respond({params: params});
  };
  
  this.start = function (req, resp, params) {
    var self = this;
    
    // create a player
    var player = geddy.model.Player.create({
      name: params.playerName
    , jobClass: params.jobClass
    });
    player.save();
    self.session.set('playerId', player.id);
    // create a round
    var round = geddy.model.Round.create({
      status: 'active'
    });
    round.save();
    // create a round_player
    var roundPlayer = geddy.model.RoundPlayer.create({
      round: round.id
    , player: player.id
    , turns: geddy.config.numberOfTurns
    , score: 0
    });
    roundPlayer.save();
    self.session.set('currentRound', round.id);
    
    this.redirect({controller: this.name, action: 'play'});
  }
  
  this.play = function (req, resp, params) {
    var self = this;
            
    // get player
    geddy.model.Player.first({id: self.session.get('playerId')}, function (err, player) {
      if (err) throw geddy.errors.InternalServerError();
      
      if (!player) {
        self.redirect({controller: self.name, action: 'index'});
      } else {
        geddy.model.RoundPlayer.first({round: self.session.get('currentRound'), player: player.id}, function (err, roundPlayer) {
          if (!roundPlayer) self.redirect({controller: self.name, action: 'index'});
          if (roundPlayer.turns > 0) {
            // get random action
            var randomActionId = actionPool[Math.floor(Math.random()*actionPool.length)];
            geddy.model.Action.first(randomActionId, function (err, randomAction) {
              // TODO: create html template play.html.ejs
              self.respond({player: player, roundPlayer: roundPlayer, randomAction: randomAction});
            });
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

