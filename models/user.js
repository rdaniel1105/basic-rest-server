
const { Schema,model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id:uid, ...user} = this.toObject();
    user.uid = uid;
    return user;
}

module.exports = model( 'User', UserSchema);