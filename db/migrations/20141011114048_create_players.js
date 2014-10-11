var CreatePlayers = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('name', 'string');
          t.column('jobClass', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('Player', def, callback);
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
    this.dropTable('Player', callback);
  };
};

exports.CreatePlayers = CreatePlayers;
