const dbValidators = require('./db-validators');
const generateJwt  = require('./generate-Jwt');
const googleVerify = require('./google-verify');
const uploadfiles  = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...generateJwt ,
    ...googleVerify,
    ...uploadfiles 
}