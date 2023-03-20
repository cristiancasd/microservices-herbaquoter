const deleteQuoter = require('./delete-quoter');
const deleteQuotersByUser = require('./delete-quoters-by-user');
const getAll = require('./get-all');
const getAllByUser = require('./get-all-by-user');
const getById = require('./get-by-id');
const getDefault = require('./get-default');
const postCreate = require('./post-create');
const updateQuoter = require('./update-quoter');
const getDefaultImage = require('./get-default-image');
const updateImage = require('./update-image');


module.exports = {
    paths:{

        '/api/quoters/default':{
            ...getDefault,
        },
        '/api/quoters':getAll,
        '/api/quoters/findbyid/{id}':getById,
        '/api/quoters/iduser/{idUser}':getAllByUser,
        '/api/quoters/create': postCreate,
        '/api/quoters/edit/{id}':updateQuoter,
        '/api/quoters/delete/{id}':deleteQuoter,
        '/api/quoters/deleteallbyuser/{idToDelete}':deleteQuotersByUser,

        '/api/files-quoters/find/{imageName}':getDefaultImage,
        '/api/files-quoters/edit/{id}':updateImage,
    }
}