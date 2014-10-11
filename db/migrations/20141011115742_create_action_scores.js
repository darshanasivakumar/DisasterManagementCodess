var CreateActionScores = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('action', 'string');
          t.column('jobClass', 'string');
          t.column('score', 'number');
          t.column('penalty', 'number');
          t.column('bonus', 'number');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('ActionScore', def, callback);
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
    this.dropTable('ActionScore', callback);
  };
};

exports.CreateActionScores = CreateActionScores;
