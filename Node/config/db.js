var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'vgdbadmin',
        password: 'portal42',
        database: 'vgdb_development',
        charset: 'utf8'
    }
});
var bookshelf = require('bookshelf')(knex);

module.exports.DB = bookshelf;