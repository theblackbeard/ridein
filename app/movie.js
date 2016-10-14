'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _validate = (v) => v.length >= 3;

const MovieSchema = new Schema({
        
        title: {
            type: String,
            required: true,
            validate: [_validate, 'Body must be have less 3 chars!']
        },
        cover: {
            type: Schema.Types.Mixed,
            require: false
        },
        category: {
            type: String,
            required: true
        },
        episodes: [
           {
             season: {type: String, default: '1'},
             name: {type: String, default: ''},
             status: {type: Boolean, default: false}
           }
        ],
        created_at: {
            type: Date,
            default: Date.now
        }
});


module.exports = mongoose.model('Movie', MovieSchema);
