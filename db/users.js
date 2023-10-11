const knex = require('./knex')


function getAllUsers(){
    return knex('users').select('*')
}

function getUserById(userId){
    return knex('users')
            .select('*')
            .where('id', userId)
}

function createNewUser(user){
    return knex('users')
            .insert(user)
}

function deleteUser(userId){
    return knex('users')
                .where('id', userId)
                .del()
}

function updateUser(userId, user){
    return knex('users')
                .where('id', userId)
                .update(user)
}

function getColumn(){
    return knex("users").columnInfo()
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    deleteUser,
    updateUser,
    getColumn
}