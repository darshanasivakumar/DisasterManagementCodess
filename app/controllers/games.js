var Games = function () {

  // Initialize Action Pool

  var actionPool = [];
  
  var action = geddy.model.Action.create({ 
    name: 'Typhoon Haiyan',
    story: ' Affected on Nov 8, 2013 — Location : Central Philippines — 13 million people affected',
    image: 'rescue2.jpeg', 
    question:  '1.9 million people have been left homeless . 2.5 million in need of food. As a rescue operator, should you help the homeless or distribute food ?',
    goodAnswer: 'Rescue the homeless first and notify the Distributor',
    jobClass: 'Rescue Operator',
    badAnswer: 'More people are dying of hunger! I need to save them!'});
	action.save();
	actionPool.push(action.id);
	
  var action2 = geddy.model.Action.create({ 
    name: 'Typhoon Haiyan',
    story: ' One of the strongest tropical cyclones ever recorded, which devastated portions of Southeast Asia, particularly the Philippines, on November 8, 2013.[1] It is the deadliestPhilippine typhoon on record , killing at least 6,300 people in that country alone. It has left 2.5 millions in need of resources and 1.9 million homeless',
    image: 'hungry.jpeg', 
    question:  'You encounter hungry children and you have a patient to deal with. Would you heal the patient or care for the child?',
    goodAnswer: 'Notify the distributor and heal the patient',
    jobClass: 'Paramedic',
    badAnswer: 'Serve the children with food and notify the Distributor'});
  action2.save();
  actionPool.push(action2.id);

var action3 = geddy.model.Action.create({ 
    name: 'Typhoon Haiyan',
    story: ' One of the strongest tropical cyclones ever recorded, which devastated portions of Southeast Asia, particularly the Philippines, on November 8, 2013.[1] It is the deadliestPhilippine typhoon on record , killing at least 6,300 people in that country alone. It has left 2.5 millions in need of resources and 1.9 million homeless',
    image: 'Typhoon-Haiyan.jpg', 
    question:  'You encounter homeless women and children looking for shelter. Would you choose to help them find a shelter or carry on about distributing food ?',
    goodAnswer: 'Distribute the food',
    jobClass: 'Distributor',
    badAnswer: 'Help the homeless and notify Rescue Operator before distributing food'});
  action3.save();
  actionPool.push(action3.id); 

  var action4 = geddy.model.Action.create({ 
    name: 'Haiti earthquake',
    story: ' Affected on Jan 12, 2010 — Location : Haiti — 3.5 million people affected - on a richter scale 7 with 52 aftershocks',
    image: 'Typhoon-Haiyan.jpg', 
    question:  'Slow distribution of resources in the days after the earthquake has resulted in sporadic violence. Help is also needed to build shelter for the displaced victims. As a security personal, what should you do?',
    goodAnswer: 'Help build shelter if I have no dire need of my speciality',
    jobClass: 'Security',
    badAnswer: 'To be on the safer side, I should only help with security actions'});
  action4.save();
  actionPool.push(action4.id);   

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
    , quota: 1
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
    var self = this;

    // get player
    geddy.model.Player.first({id: self.session.get('playerId')}, function (err, player) {
      if (err) throw geddy.errors.InternalServerError();
      
      if (!player) {
        self.redirect({controller: self.name, action: 'index'});
      } else {
        geddy.model.Action.first(params.actionId, function (err, action) {
          if (!action) self.redirect({controller: self.name, action: 'play'});
          geddy.model.RoundPlayer.first({round: self.session.get('currentRound'), player: player.id}, function (err, roundPlayer) {
            if (!roundPlayer) self.redirect({controller: self.name, action: 'index'});
            
            geddy.log.debug(JSON.stringify(params));
            if (params.answer !== '') {
              var isAGoodAnswer = (action.goodAnswer === params.answer);
              geddy.log.debug(isAGoodAnswer);
              if (isAGoodAnswer) {
                if (player.jobClass === action.jobClass) {
                  roundPlayer.score += 50;
                  roundPlayer.quota--;
                } else {
                  if (roundPlayer.quota > 0) {
                    roundPlayer.score -= 20;
                  } else {
                    roundPlayer.score += 20;
                  }
                }
              } else {
                roundPlayer.score -= 20;
              }
              roundPlayer.turns--;
              roundPlayer.save();
            }
            
            if (roundPlayer.turns > 0) {
              self.redirect({controller: self.name, action: 'play'});
            } else {
              // end game
              self.redirect({controller: self.name, action: 'end'});
            }
          });
        });
      }
    });
  }
  
  this.end = function (req, resp, params) {
    var self = this;

    // get player
    geddy.model.Player.first({id: self.session.get('playerId')}, function (err, player) {
      if (err) throw geddy.errors.InternalServerError();
      
      if (!player) {
        self.redirect({controller: self.name, action: 'index'});
      } else {
        geddy.model.RoundPlayer.first({round: self.session.get('currentRound'), player: player.id}, function (err, roundPlayer) {
          if (!roundPlayer) self.redirect({controller: self.name, action: 'index'});
          self.respond({player: player, roundPlayer: roundPlayer});
        });
      }
    });
  };
  
};

exports.Games = Games;

