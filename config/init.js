var init = function(cb) {
  // Add uncaught-exception handler in prod-like environments
  if (geddy.config.environment != 'development') {
    process.addListener('uncaughtException', function (err) {
      var msg = err.message;
      if (err.stack) {
        msg += '\n' + err.stack;
      }
      if (!msg) {
        msg = JSON.stringify(err);
      }
      geddy.log.error(msg);var init = function(cb) {
  // Add uncaught-exception handler in prod-like environments
  if (geddy.config.environment != 'development') {
    process.addListener('uncaughtException', function (err) {
      var msg = err.message;
      if (err.stack) {
        msg += '\n' + err.stack;
      }
      if (!msg) {
        msg = JSON.stringify(err);
      }
      geddy.log.error(msg);
    });
  }
  
  geddy.actionPool = [];
   var action = geddy.model.Action.create({
    name: 'HurricaneKatrina'
	, story: 'One of the 5 deadliest hurricanes in the US so far.  ~1833 lives affected.  '
	, image: ''
	, jobClass: ''
	, goodAnswer: ''
	, badAnswer: ''
    , jobClass: req.jobClass
    }).save();
	geddy.actionPool.push(action.Id);
	
	var action1 = geddy.model.Action.create({
	 name: 'FoodDistribution'
	 , story: '100 families in need of food supplies 10 meters from you'
	 , image: ''
	 , jobClass: ''
	 , goodAnswer: ''
	 , badAnswer: ''
	 }).save();
	 geddy.actionPool.push(action1.Id);
	 
	 var action2 = geddy.model.Action.create({
	  name: 'MedicalHelp'
	  , story: '~200 people need first aid in a nearby shelter'
	  , image: ''
	  , jobClass: ''
	  , goodAnswer: ''
	  , badAnswer: ''
	 }).save();
	 geddy.actionPool.push(action2.Id);
	 
  cb();
};

exports.init = init;
    });
  }
  cb();
};

exports.init = init;