'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    rgm: {
      type: String,
      required: true,
      trim: true  
    },
    cpf:{
      type: String,
      required: true,
      trim: true 
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    address: [
      {
        street : {type: String},
        city: {type: String},
        state: {type: String},
        zip: {type: String}
      }
    ],
    course:{
      type: Schema.Types.Mixed,
      required: true; 
    },  
    photo: {
        type: Schema.Types.Mixed,
        required: false
    },
    phones:{
       type: Schema.Types.Mixed,
        required: true 
    },
    registry:[
      {
        rideTake: {type: Number},
        rideGet: {type: Number}  
      }

    ],
    
    level: {
      type: Number,
      required: false,
      default:4
    },

    active: {
      type: Number,
      required: false,
      default: 2 //1 ok - 2 pedding 3 deny  
    },
    
    feedback: [{
        author: {type: Schema.ObjectId, ref: 'User'},
        body: {type: String, default: ''},
     }],

    star:{
        type: Number,
        required: false,
        default: 0   
    },  
      
    created_at: {
        type: Date,
        default: Date.now
    },
    
    updated_at: {
        type: Date
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);