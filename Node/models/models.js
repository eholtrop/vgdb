var DB = require('./../config/db').DB;

var User = DB.Model.extend({
   tableName: 'users',
    idAttribute: 'user_id'
});

var Game = DB.Model.extend({
    tableName: 'games',
    idAttribute: 'game_id',
    release_dates: function() {
        return this.hasMany(ReleaseDate, "release_date_id")
    }
});


var Console = DB.Model.extend({
    tableName: 'consoles',
    idAttribute: 'console_id'
});

var ReleaseDate = DB.Model.extend({
    tableName: 'release_dates',
    idAttribute: 'release_date_id',
    game: function() {
        return this.belongsTo(Game, "game_id");
    },
    console: function() {
        return this.belongsTo(Console, "console_id");
    }
});
module.exports = {
    User: User,
    Game: Game,
    ReleaseDate: ReleaseDate,
    Console: Console
};