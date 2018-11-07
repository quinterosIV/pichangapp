const mongoose = require('mongoose');
const _ = require('underscore');

let matchSchema = new mongoose.Schema({
    name : {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: true,
    },
    local : {
        type: String,
        required: true
    }, 
    guest : {
        type: String,
        required: false
    },
    state : { 
        type: Number,
        required: true,
    },
    location : {
        type : String,
        required: false
    },
    date: {
        type : String,
        required : false
    },
    price: {
        type: Number,
        required: false
    },
    time: {
        type: String,
        required: true
    }
});

matchSchema.methods.toJSON = function() {
    let match = this.toObject();
    match = _.pick(match, ['name', 'local', 'guest', 'state', 'location', 'date', 'price']);
    return match;
}

module.exports = mongoose.model('match', matchSchema);