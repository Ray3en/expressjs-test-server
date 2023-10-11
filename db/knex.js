const knex = require('knex')

const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: 'uksers.sqlite'
    },
    useNullAsDefault: true
})

module.exports = connectedKnex