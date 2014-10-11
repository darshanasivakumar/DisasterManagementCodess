var CreateRounds = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('status', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('Round', def, callback);
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
    this.dropTable('Round', callback);
  };
};

exports.CreateRounds = CreateRounds;
