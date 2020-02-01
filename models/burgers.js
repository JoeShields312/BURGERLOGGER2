const orm = require("../config/orm");

let burgers = {
    selectAll: function(cb) {
        orm.selectAll('burgers', function(res) {
            cb(res);
        });
    },
    insertOne: function(cols, vals, cb) {
        orm.insertOne('burgers', cols, vals, function(res) {
            cb(res);
        });
      },
      updateOne: function(objColVals, condition, cb) {
        orm.updateOne('burgers', objColVals, condition, function(res) {
            cb(res);
        });
      }, 
      deleteOne: function(condition, cb) {
          orm.deleteOne('burgers', condition, function(res) {
            cb(res);
    });
}
};

module.exports = burgers;