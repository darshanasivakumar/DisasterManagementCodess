var CreateRoundPlayers = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('round', 'string');
          t.column('player', 'string');
          t.column('turns', 'string');
          t.column('score', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('RoundPlayers', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('RoundPlayers', callback);
  };
};

exports.CreateRoundPlayers = CreateRoundPlayers;
